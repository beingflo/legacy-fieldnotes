export const mapError = (response: Response): any => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};
