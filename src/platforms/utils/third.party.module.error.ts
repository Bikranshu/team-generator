import HttpStatus from 'http-status-codes';

export default (err: any) => {
  console.error(
    `GENERIC MODULE ERROR MESSAGE:::::::::::::: ${err?.message}, StatusCode: ${err?.output?.statusCode} at ${err?.stack.replace(/\n\s*/g, ' ')} with data: ${err?.data}`
  );

  if (err.isJoi) {
    return {
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details:
        err.details &&
        err.details.map((err: any) => {
          return {
            message: err.message,
            param: err.path.join('.'),
          };
        }),
    };
  } else if (err.isBoom) {
    return {
      code: err.output.statusCode,
      success: false,
      message: err.output.payload.message || err.output.payload.error || err,
    };
  }   else {
    return {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
    };
  }
};
