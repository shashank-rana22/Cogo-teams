import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

// import { useFormCogo } from '@cogoport/front/hooks';
// import { Toast } from '@cogoport/front/components/admin';
// import { getApiErrorString } from '@cogoport/front/utils';

const useUpdateCancelShipment = ({
	id,
	setShowCancel = () => {},
	refetch = () => {},
	setShowBookingOption = () => {},
}) => {
	const [errors, setErrors] = useState({});

	const cancelShipment = useRequest('/update_shipment', { manual: true });

	// const formValues = watch();

	const onError = (err) => {
		setErrors(err);
	};

	const onSubmit = async () => {
		const submit_data = { id, state: 'cancelled' };

		try {
			const res = await cancelShipment.trigger({ data: submit_data });

			if (!res.hasError) {
				Toast.success('Shipment Cancelled');
				setShowCancel(false);
				setShowBookingOption(false);
				refetch();
			} else {
				Toast.error('Something went wrong, we are working on it!');
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.data));
		}
	};

	return {
		onSubmit,
		loading     : cancelShipment.loading,
		handleSubmit,
		fields,
		onError,
		errors,
		controls,
		formValues,
		shipment_id : query?.id,
	};
};

export default useUpdateCancelShipment;
