import { useState } from 'react';
import { useRequest } from '@cogoport/request';
// import {useForm} from '@cogoport/forms';
import { Toast } from '@cogoport/components';
// import { getApiErrorString } from '@cogoport/utils';
import controls from '../../utils/revenueDeskUtils/getCancellationControls';

const useUpdateCancelShipment = ({
	id,
	setShowCancel = () => {},
	refetch = () => {},
	setShowBookingOption = () => {},
}) => {

	const [errors, setErrors] = useState({});

	const [{loading}, trigger] = useRequest({url : '/update_shipment',
										method : 'post', }, {manual:true});

	const { watch, handleSubmit, getValues,
		 control } = useForm();
	const formValues = watch();

	const onError = (err) => {
		setErrors(err);
	};

	const onSubmit = async () => {
		const submit_data = { id,  state: 'cancelled' };

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