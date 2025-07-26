interface IApiError {
  message: string;
  field: string;
}

export const mapErrors = (errors: IApiError[]) => {
  return errors.reduce((acc: Record<string, string[]>, err: IApiError) => {
    if (!acc[err.field]) {
      acc[err.field] = [];
    }
    acc[err.field].push(err.message);
    return acc;
  }, {});
};
