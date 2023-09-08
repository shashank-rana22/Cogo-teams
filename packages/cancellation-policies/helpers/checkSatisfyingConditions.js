import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

const ZERO = 0;

const HUNDRED = 100;
const checkSatisfyingConditions = ({ data }) => {
	// const slabs = [...detention, ...demurrage].filter((i) => !!i.upper_limit);

	// if (isEmpty(slabs)) {
	// 	Toast.error(`Add ${startCase(free_days_type)}`);
	// 	return false;
	// }

	// const satisfyingDaysLimit = slabs.every((itm) => (
	// 	Number(itm?.lower_limit) < Number(itm?.upper_limit) && Number(itm?.upper_limit) > Number(data?.free_limit)
	// ));

	// if (!satisfyingDaysLimit) {
	// 	Toast.error('Upper limit and lower limit of days should always be greater than free limit days');
	// 	return false;
	// }

	// return true;
	const { slabs = [] } = data || {};

	const satisfyingDaysLimit = slabs?.every((itm) => (
		Number(itm.lower_limit) < Number(itm.upper_limit)
            && Number(itm.upper_limit) > Number(data?.free_days)
	));

	if (!satisfyingDaysLimit) {
		Toast.error(
			'upper limit and lower limit of days should always be greater than free limit days',
		);
		return false;
	}

	if (
		data?.charge_type === 'percentage'
        && (parseFloat(data?.value) <= ZERO || parseFloat(data?.value) > HUNDRED)
	) {
		Toast.error('Percentage Value should lie between 0 to 100');
		return false;
	}

	if (data?.charge_type !== '' && parseFloat(data?.value) < ZERO) {
		Toast.error('Value cannot be less than 0');
		return false;
	}

	if (parseFloat(data.min_value) > parseFloat(data?.max_value)) {
		Toast.error('Min Value cannot be greater than Max Value');
		return false;
	}

	if (
		!(
			!isEmpty(data.origin_location_id)
            === !isEmpty(data.destination_location_id)
		)
	) {
		Toast.error('Origin and Destination both should be selected');
		return false;
	}

	return true;
	// const { conditions, ...rest } = submit_data;

	// if (!isEmpty(conditions)) {
	//     rest.conditions = conditions.map((item) => ({
	//         [item.attribute]: `${cancellationReasonMapping[item.condition]} ${
	//             item.days
	//         }`,
	//     }));
	// }
};

export default checkSatisfyingConditions;
