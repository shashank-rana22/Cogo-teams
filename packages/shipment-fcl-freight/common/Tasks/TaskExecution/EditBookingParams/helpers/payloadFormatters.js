import getDependentServices from '../../../../utils/getDependentServices';

const ROLLOVER_STATUS = {
	true  : { rollover_status: 'requested' },
	false : { rollover_status: 'cancelled', is_deleted: true },
};

export const formatForContainerDetails = ({ rawData = [], formValues }) => {
	const rollover_containers = rawData.reduce(
		(prev, curr) => prev.concat(curr.container_numbers),
		[],
	);

	const ADDITIONAL_DATA_TO_SEND = {};
	rollover_containers.forEach((id) => {
		ADDITIONAL_DATA_TO_SEND[id] = ROLLOVER_STATUS[formValues?.shipment_rollover];
	});
	return ADDITIONAL_DATA_TO_SEND;
};

export const formatForBookingParams = ({
	rawData = [],
	formValues,
	task,
	servicesList = [],
}) => {
	const payload = {
		services      : [],
		shipment_id   : task?.shipment_id,
		rollover_data : {
			shipment_rollover_status:
				ROLLOVER_STATUS[formValues?.shipment_rollover]?.rollover_status,
			...(formValues?.shipment_rollover === 'true' && { task: task.task }),
		},
	};

	rawData.forEach((item) => {
		if (item.container_numbers.length) {
			const updateParams = {
				containers_count: item.original_count - item.container_numbers.length,
			};
			payload.services.push({
				service_id     : item.service_id,
				service_type   : item.service_type,
				booking_params : updateParams,
			});

			const dependentServices = getDependentServices({ servicesList, serviceData: item });

			(dependentServices || []).forEach((dependentItem) => {
				payload.services.push({
					service_id     : dependentItem.id,
					service_type   : dependentItem.service_type,
					booking_params : updateParams,
				});
			});
		}
	});
	return payload;
};
