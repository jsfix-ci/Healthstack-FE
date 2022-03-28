const ProductEntryQuery = (facilityId?: string, storeId?: string, val?: string) => {
  return {
    query: {
      $or: val && [
        {
          source: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          type: {
            $regex: val,
            $options: 'i',
          },
        },
      ],
      facility: facilityId,
      store: storeId,
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    },
  };
};

export { ProductEntryQuery };
