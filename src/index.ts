const defaultOptions = {
  maxAttempts: 10,
  retryDelay: 0,
  onError: (err: any, attempt: number) => {},
};

function promiseRetry<T>(
  func: (attempt: number) => Promise<T>,
  options = defaultOptions,
  attempt = 1
): Promise<T> {
  const config = { ...defaultOptions, ...options };

  return func(attempt).catch((err: any) => {
    // For logging...
    config.onError(err, attempt);

    if (attempt < config.maxAttempts) {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve(promiseRetry(func, options, attempt + 1)),
          config.retryDelay
        );
      });
    } else {
      throw err;
    }
  });
}

export default promiseRetry;