import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useUpdateShipmentFaultAlarm = ({
	setResolve = () => {},
	reload,
	setReload = () => {},
}) => {
	const [errors, setErrors] = useState({});
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_fault_alarm',
		method : 'POST',
	}, { manual: true });
	const { control, watch, reset, handleSubmit } = useForm();
	const formValues = watch();
	const date = new Date();

	const onError = (err) => {
		setErrors(err);
	};

	const onUpdate = async (val) => {
		try {
			await trigger({
				data: {
					id         : val?.id,
					snoozed_at : date,
				},
			});

			Toast.success('Alarm Snoozed');
			setReload(!reload);
		} catch (err) {
			toastApiError(err?.data?.alarm);
		}
	};

	const onSubmit = async (val) => {
		try {
			await trigger({
				data: {
					id              : val?.id,
					status          : 'inactive',
					resolved_remark : formValues?.remarks,
				},
			});

			Toast.success('Remarks sent');
			setResolve(false);
			setReload(!reload);
		} catch (err) {
			Toast.error(err?.data?.alarm);
		}
	};

	return {
		onUpdate,
		onSubmit,
		handleSubmit,
		reset,
		loading,
		setErrors,
		control,
		errors,
		onError,
	};
};

export default useUpdateShipmentFaultAlarm;
