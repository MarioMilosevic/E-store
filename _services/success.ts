function createSuccessResponse(
  status: number,
  message: string,
  data?: unknown
) {
  return new Response(JSON.stringify({ message, data, success: true }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const successFactory = {
  ok: (data: unknown, message: string, status: number = 200) => {
    return createSuccessResponse(status, message, data);
  },
  created: (data: unknown, message: string, status: number = 201) => {
    return createSuccessResponse(status, message, data);
  },
  noContent: (message: string, status: number = 204) => {
    return createSuccessResponse(status, message);
  },
};

export default successFactory;
