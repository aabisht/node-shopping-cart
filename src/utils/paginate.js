export const paginate = (data, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const items = data.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(data.length / pageSize);

  return {
    page,
    pageSize,
    totalPages,
    totalItems: data.length,
    items,
  };
};
