const serviceQuery = (facilityId?: string, val?: string) => {
  return {
    query: {
      $or: val && [
        {
          category: {
            $regex: val,
            $options: 'i',
          },
        },
      ],
      facilityId,
      $limit: 30,
      $sort: {
        category: 1,
      },
    },
  };
};

export { serviceQuery };
