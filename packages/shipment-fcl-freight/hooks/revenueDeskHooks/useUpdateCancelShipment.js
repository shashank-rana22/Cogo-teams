import { useState } from 'react';
import { useRequest } from '@cogo/commons/hooks';
// import { useFormCogo } from '@cogoport/front/hooks';
// import { toast } from '@cogoport/front/components/admin';
// import { getApiErrorString } from '@cogoport/front/utils';
import controls from '../../Shared/utils/cancellation-controls';

const useUpdateCancelShipment = ({
	id,
	setShowCancel = () => {},
	refetch = () => {},
	setShowBookingOption = () => {},
}) => {

	const [errors, setErrors] = useState({});

	const cancelShipment = useRequest('/update_shipment', {manual:true});

	const { fields, watch, handleSubmit } = useFormCogo(controls);
	// const formValues = watch();

	const onError = (err) => {
		setErrors(err);
	};

	const onSubmit = async () => {
		const submit_data = { id,  state: 'cancelled' };

		try {
			const res = await cancelShipment.trigger({ data: submit_data });

			if (!res.hasError) {
				toast.success('Shipment Cancelled');
				setShowCancel(false);
				setShowBookingOption(false);
				refetch();
			} else {
				toast.error('Something went wrong, we are working on it!');
			}
		} catch (err) {
			toast.error(getApiErrorString(err?.data));
		}
	};

	return {
		onSubmit,
		loading: cancelShipment.loading,
		handleSubmit,
		fields,
		onError,
		errors,
		controls,
		formValues,
		shipment_id: query?.id,
	};
};

export default useUpdateCancelShipment;