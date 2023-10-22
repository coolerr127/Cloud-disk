import axios from "axios";
import { API } from "../constants/common.constants";
import { IResponse } from "../constants/common.interfaces";
import { Guid } from "../constants/common.types";
import { errorHandler, responseHandler } from "../utils/common.utils";

const AUTH_API = `${API}/auth`;

export interface IUser {
  id: Guid;
  email: string;
  diskSpace: number;
  usedSpace: number;
}

interface IAuthorizationResponse extends IResponse {
  token: string;
  user: IUser;
}

export interface IAuthorizationData {
  email: string;
  password: string;
}

export const registration = async (data: any) => {
  await axios
    .post(`${AUTH_API}/registration`, data)
    .then((res) => responseHandler(res))
    .catch((err) => errorHandler(err));
};

export const authorization = async (
  data: IAuthorizationData,
): Promise<IAuthorizationResponse> => {
  try {
    const response = await axios.post(`${AUTH_API}/login`, data);
    localStorage.setItem("token", response.data.token);
    return responseHandler(response);
  } catch (err: any) {
    errorHandler(err);
    throw err;
  }
};
