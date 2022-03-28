const DispenseQuery = (facilityId?: string, val?: string) => {
  return {
    query: {
      $or: val && [
        {
          'participantInfo.paymentmode.detail.principalName': {
            $regex: val,
            $options: 'i',
          },
        },
      ],
      'participantInfo.billingFacility': facilityId,
      'orderInfo.orderObj.order_category': 'Prescription',
      billing_status: {
        $ne: 'Unpaid',
      },
      'orderInfo.orderObj.fulfilled': {
        $ne: 'True',
      },
      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    },
  };
};

export { DispenseQuery };
