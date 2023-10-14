import axios from "axios";
import { APi } from "../constants/common.constants";

export const registration = async (data: any) => {
  try {
    const response = await axios.post(`${APi}/auth/registration`, data);
  } catch (e) {
    console.log(e);
  }
};
