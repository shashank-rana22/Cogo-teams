import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

// import { getApiErrorString } from '@cogoport/front/utils';

const useUpdateCancelShipment = ({
	id,
	setShowCancel = () => {},
	refetch = () => {},
	setShowBookingOption = () => {},
}) => {
	const [errors, setErrors] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment',
		method : 'post',
	}, { manual: true });

	const onError = (err) => {
		setErrors(err);
	};

	const onSubmit = async (formValues) => {
		const submit_data = { id, state: 'cancelled', ...formValues };

		try {
			const res = await trigger({ data: submit_data });

			if (!res.hasError) {
				Toast.success('Shipment Cancelled');
				setShowCancel(false);
				setShowBookingOption(false);
				refetch();
			} else {
				Toast.error('Something went wrong, we are working on it!');
			}
		} catch (err) {
			Toast.error(err);
		}
	};

	return {
		onSubmit,
		loading,
		onError,
		errors,
	};
};

export default useUpdateCancelShipment;
