import { AxiosError, AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";

export const formDataToObject = (formData: FormData): {} => {
  const jsonData: Record<string, string> = {};

  formData.forEach((value, key) => {
    jsonData[key] = value as string;
  });

  return jsonData;
};

export const responseHandler = (res: AxiosResponse) => {
  console.log(res.data.message);
  enqueueSnackbar(res.data.message, {
    variant: "success",
    anchorOrigin: { vertical: "top", horizontal: "center" },
    autoHideDuration: 3000,
  });

  return res.data;
};

export const errorHandler = (err: AxiosError<{ message: string }>) => {
  enqueueSnackbar(err?.response?.data?.message, {
    variant: "error",
    anchorOrigin: { vertical: "top", horizontal: "center" },
    autoHideDuration: 3000,
  });
  console.error(err);
};
