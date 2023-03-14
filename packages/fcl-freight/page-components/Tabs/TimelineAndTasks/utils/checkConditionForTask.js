const checkConditionForTask = (serviceData) => {
	if (
		['fcl_freight_service', 'lcl_freight_service'].includes(
			serviceData?.service_type,
		)
	) {
		const hbl_details = serviceData?.hbl_details || [];
		const movement_details = serviceData?.movement_details || [];
		const mbl_details = serviceData?.mbl_details || [];
		const container_details = serviceData?.container_details || [];

		if (serviceData?.service_type === 'fcl_freight_service') {
			return (
				(hbl_details?.length || mbl_details?.length) &&
				movement_details?.length &&
				container_details?.length
			);
		}
		return mbl_details?.length || hbl_details?.length;
	}
	if (serviceData?.service_type === 'air_freight_service') {
		const mbl_details = serviceData?.mbl_details || [];
		const hbl_details = serviceData?.hbl_details || [];

		return mbl_details.length || hbl_details.length;
	}
	return false;
};

export default checkConditionForTask;
