import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import controls from '../utils/controls';

const useEditPoc = ({ data = {}, refetchVendorInfo = () => {} }) => {
	const { general: { query } } = useSelector((state) => ({
		general: state.general,
	}));

	const { vendor_id } = query;

	const [showEditPocModal, setShowEditPocModal] = useState(false);

	const filtered_data = data?.pocs?.filter((item) => item?.is_primary === true)?.[0];

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		setValue,
	} = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : 'update_vendor_poc',
		method : 'post',
	}, { manual: true });

	const onSubmit = async () => {
		const values = getValues();

		try {
			await trigger({
				data: {
					vendor_id,
					name                : values?.name,
					email               : values?.email,
					mobile_country_code : values?.mobile_number?.country_code,
					mobile_number       : values?.mobile_number?.number,
					poc_role            : values?.poc_role,
				},
			});

			setShowEditPocModal(false);

			refetchVendorInfo();

			Toast.success('Updated successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.response.data));
		}
	};

	useEffect(() => {
		(controls || []).forEach((field) => {
			if (field.name === 'mobile_number') {
				setValue('mobile_number', {
					number       : filtered_data?.mobile_number,
					country_code : filtered_data?.mobile_country_code,
				});
			} else {
				setValue(`${field.name}`, filtered_data?.[field.name]);
			}
		});
	}, [filtered_data, setValue]);

	return {
		control,
		controls,
		handleSubmit,
		errors,
		onSubmit,
		showEditPocModal,
		setShowEditPocModal,
		loading,
	};
};

export default useEditPoc;
