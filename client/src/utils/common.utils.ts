export const formDataToObject = (
  formData: FormData,
): Record<string, string> => {
  const jsonData: Record<string, string> = {};

  formData.forEach((value, key) => {
    jsonData[key] = value as string;
  });

  return jsonData;
};
