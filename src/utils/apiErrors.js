export const RATE_LIMIT_MESSAGE =
  "Too many requests. Please try again in a minute.";

export const getApiErrorDetails = (error, fallbackMessage) => {
  const status = error?.response?.status;
  const data = error?.response?.data;
  const errors =
    data && typeof data.errors === "object" && data.errors !== null
      ? data.errors
      : {};

  if (status === 429) {
    return {
      message: RATE_LIMIT_MESSAGE,
      errors,
      status,
    };
  }

  if (typeof data?.message === "string" && data.message.trim()) {
    return {
      message: data.message,
      errors,
      status,
    };
  }

  const firstFieldError = Object.values(errors).find(
    (value) => typeof value === "string" && value.trim(),
  );

  return {
    message: firstFieldError || fallbackMessage,
    errors,
    status,
  };
};

export const getApiErrorMessage = (error, fallbackMessage) =>
  getApiErrorDetails(error, fallbackMessage).message;

export const isValidReference = (value) =>
  typeof value === "string" && /^[A-Za-z0-9_-]+$/.test(value.trim());
