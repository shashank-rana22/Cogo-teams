import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import controls from '../../ShowPocForm/utils/controls';

const useAddServicePoc = ({
	showForm,
	setShowForm = () => {},
	refetchServicesPocs = () => {},
}) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		setValue,
	} = useForm();

	const newControls = controls.filter((item) => (item.showIn) && (item.showIn).includes('editPOC'));

	const {
		general : { query = {} },
	} = useSelector((state) => state);

	const { vendor_id } = query;

	const [{ loading }, trigger] = useRequest({
		url    : 'update_vendor_poc',
		method : 'post',
	}, { manual: true });

	const onSubmit = async () => {
		const values = getValues();

		try {
			const payload = {
				name                : values?.name,
				email               : values?.email,
				mobile_country_code : values?.mobile_number?.country_code,
				mobile_number       : values?.mobile_number?.number,
				poc_role            : values?.poc_role,
				vendor_id,
			};

			await trigger({ data: payload });

			refetchServicesPocs();

			Toast.success('Service Poc added Successfully');

			setShowForm('');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Failed to create service poc, please try again...');
		}
	};

	useEffect(() => {
		const { data = [] } = showForm;

		const {
			name = '',
			email = '',
			mobile_number = '',
			poc_role = [],
		} = data?.[0] || {};

		setValue('name', name);
		setValue('email', email);
		setValue('mobile_number', {
			country_code : mobile_number.split(' ')[0],
			number       : mobile_number.split(' ')[1],
		});
		setValue('poc_role', poc_role);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		loading,
		updatedControls: newControls,
		errors,
		control,
		handleSubmit,
		onSubmit,
	};
};

export default useAddServicePoc;
