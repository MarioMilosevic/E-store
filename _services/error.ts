function createErrorResponse(status: number, message?: string) {
  return new Response(JSON.stringify({ message, success:false }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const errorFactory = {
  badRequest: (message: string = "Bad Request") =>
    createErrorResponse(400, message),
  notAuthorized: (message: string = "Not Authorized") =>
    createErrorResponse(401, message),
  forbidden: (message: string = "Forbidden") =>
    createErrorResponse(403, message),
  notFound: (message: string = "Not Found") =>
    createErrorResponse(404, message),
  internalServerError: (message: string = "Internal Server Error") =>
    createErrorResponse(500, message),
};

export default errorFactory;
