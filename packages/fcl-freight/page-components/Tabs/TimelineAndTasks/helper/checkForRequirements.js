import startCase from '@cogo/utils/startCase';
import isEmpty from '@cogo/utils/isEmpty';

const checkForUniqness = (values, uniqeField) => {
	const numbers = (values || []).map((item) => item[uniqeField]);
	let newContainerNumbers = new Set(numbers);
	newContainerNumbers = [...newContainerNumbers];
	if (numbers.length !== newContainerNumbers.length) return true;
	return false;
};

const checkForContainers = (values, count) => {
	let totalCount = 0;
	(values || []).forEach((item) => {
		totalCount += item.container_quantity;
	});
	if (totalCount !== count) return true;
	return false;
};

const checkRequirement = (
	rawValues,
	finalConfig,
	shipment_data,
	setLoading,
	setMessage,
) => {
	if (!rawValues) {
		setLoading(false);
		setMessage({ type: 'error', message: 'Please provide required details' });
		return false;
	}

	if (
		finalConfig.uniqeField &&
		checkForUniqness(
			(rawValues || {})[finalConfig.uniqeFieldDataKey || 'data'],
			finalConfig.uniqeField,
		)
	) {
		setMessage({
			type: 'error',
			message: `Please provide distinct ${startCase(
				finalConfig.uniqeField || '',
			)}`,
		});
		setLoading(false);
		return false;
	}

	if (
		finalConfig.checkForContainers &&
		checkForContainers(
			(rawValues || {}).documents || [],
			(shipment_data || {}).containers_count,
		)
	) {
		setMessage({
			type: 'error',
			message: `Containers count in booking notes should be equal to total container count i.e. ${shipment_data.containers_count}`,
		});
		setLoading(false);
		return false;
	}

	if (finalConfig?.formatType === 'update_carrier_booking_reference_number') {
		if (
			rawValues?.booking_ref_status === 'placed' &&
			isEmpty(rawValues?.booking_reference_number) &&
			isEmpty(rawValues?.booking_reference_proof)
		) {
			setMessage({
				type: 'error',
				message:
					'Booking Reference Number or Booking Reference proof, atleast one is mandatory to complete this task.',
			});
			setLoading(false);
			return false;
		}
	}
	return true;
};

export default checkRequirement;
