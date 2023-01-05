import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useUpdateCancelShipment = ({
	id,
	setShowCancel = () => {},
	refetch = () => {},
	setShowBookingOption = () => {},
	onClose = () => {},
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
				onClose();
			}
		} catch (err) {
			Toast.error('Something went wrong');
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
