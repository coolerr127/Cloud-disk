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
  enqueueSnackbar(res.data.message, {
    variant: "success",
    anchorOrigin: { vertical: "top", horizontal: "center" },
    autoHideDuration: 3000,
  });

  return res.data;
};

export const errorHandler = (err: AxiosError<{ message: string }>) => {
  if (err?.response?.data?.message) {
    enqueueSnackbar(err?.response?.data?.message, {
      variant: "error",
      anchorOrigin: { vertical: "top", horizontal: "center" },
      autoHideDuration: 3000,
    });
  } else {
    enqueueSnackbar("Network Error", {
      variant: "error",
      anchorOrigin: { vertical: "top", horizontal: "center" },
      autoHideDuration: 3000,
    });
  }

  throw err;
};
