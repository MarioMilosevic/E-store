function createSuccessResponse(status: number, data?: unknown) {
  return new Response(JSON.stringify({ status, data }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const successFactory = {
  ok: (data: unknown, status: number = 200) => {
    return createSuccessResponse(status, data);
  },
  created: (data: unknown, status: number = 201) => {
    return createSuccessResponse(status, data);
  },
  noContent: (status: number = 204) => {
    return createSuccessResponse(status);
  },
};

export default successFactory;
