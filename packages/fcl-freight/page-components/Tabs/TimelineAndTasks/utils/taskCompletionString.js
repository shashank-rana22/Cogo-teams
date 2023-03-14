const taskCompletionString = (serviceData) => {
	if (
		['fcl_freight_service', 'lcl_freight_service'].includes(
			serviceData?.service_type,
		)
	) {
		const hbl_details = serviceData?.hbl_details || [];
		const movement_details = serviceData?.movement_details || [];
		const mbl_details = serviceData?.mbl_details || [];
		const container_details = serviceData?.container_details || [];

		const arr = [];

		if (serviceData?.service_type === 'fcl_freight_service') {
			let check = false;
			if (hbl_details?.length !== 0 || mbl_details?.length !== 0) {
				check = true;
			}
			if (!check) {
				arr.push('Upload bill of lading');
			}
			if (movement_details?.length === 0) {
				arr.push('Upload Booking note desk');
			}

			if (container_details?.length === 0) {
				arr.push('Upload Container detail');
			}
		}
		return arr.join(', ').length
			? `Please Complete ${arr.join(', ')} task before proceeding this task`
			: '';
	}
	if (serviceData?.service_type === 'air_freight_service') {
		const mbl_details = serviceData?.mbl_details || [];
		const hbl_details = serviceData?.hbl_details || [];

		const arr = [];

		let check = false;
		if (hbl_details?.length !== 0 || mbl_details?.length !== 0) {
			check = true;
		}
		if (!check) {
			arr.push('Upload bill of lading');
		}
		return arr.join(', ').length
			? `Please Complete ${arr.join(', ')} task before proceeding this task`
			: '';
	}
	return '';
};

export default taskCompletionString;
