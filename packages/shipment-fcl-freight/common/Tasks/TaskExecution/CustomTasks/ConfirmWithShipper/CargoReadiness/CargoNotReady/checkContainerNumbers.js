import { isEmpty } from '@cogoport/utils';

export const getPlanningContainerServiceWise = ({ planning = [] }) => planning?.reduce((res, planService) => {
	const containerCount = parseInt(planService?.containers_count || 0, 10);
	return {
		...res,
		[planService?.service_id]: (res?.[planService?.service_id] || 0) + containerCount,
	};
}, {});

const checkContainerNumbers = ({ fclServices = [], formValues = {} }) => {
	const { planning = [] } = formValues || {};

	if (isEmpty(planning)) {
		return false;
	}

	let check = true;
	const planningContainerServiceWise = getPlanningContainerServiceWise({ planning });
	Object.keys(planningContainerServiceWise).forEach((serviceId) => {
		if (check) {
			const service = fclServices?.find((s) => s?.id === serviceId);

			if (isEmpty(service) || service.containers_count < planningContainerServiceWise[serviceId]) check = false;
		}
	});

	return check;
};

export default checkContainerNumbers;
