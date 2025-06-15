function createSuccessResponse(
  status: number,
  message: string,
  data?: unknown
) {
  return new Response(JSON.stringify({ message, sucess: true, data }), {
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
  noContent: (status: number = 204) => {
    return new Response(null, {
      status,
    });
  },
};

export default successFactory;
