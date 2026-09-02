function isAxiosEror(payload: any): payload is AxiosError {
  return (
    payload !== null && typeof payload === "object" && payload.isAxiosError
  );
}
