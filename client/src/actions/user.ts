import axios from "axios";
import { API } from "../constants/common.constants";
import { IResponse } from "../constants/common.interfaces";
import { Guid } from "../constants/common.types";
import { errorHandler, responseHandler } from "../utils/common.utils";

const AUTH_API = `${API}/auth`;

export interface IUser {
  id: Guid;
  firstName: string;
  // email: string;
  // diskSpace: number;
  // usedSpace: number;
}

interface IAuthorizationResponse extends IResponse {
  token: string;
  user: IUser;
}

export interface ILoginData {
  email: string;
  password: string;
}

export const registration = async (data: any) => {
  await axios
    .post(`${AUTH_API}/registration`, data)
    .then((res) => responseHandler(res))
    .catch((err) => errorHandler(err));
};

export const login = async (
  data: ILoginData,
): Promise<IAuthorizationResponse> => {
  try {
    const response = await axios.post(`${AUTH_API}/login`, data);
    localStorage.setItem("token", response.data.token);
    return responseHandler(response);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      errorHandler(err);
    } else {
      console.error("An unexpected error occurred", err);
    }
    throw err;
  }
};

export const authorization = async (): Promise<IAuthorizationResponse> => {
  try {
    const response = await axios.get(`${AUTH_API}/auth`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return responseHandler(response);
  } catch (err: unknown) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      errorHandler(err);
    } else {
      console.error("An unexpected error occurred", err);
    }
    throw err;
  }
};
