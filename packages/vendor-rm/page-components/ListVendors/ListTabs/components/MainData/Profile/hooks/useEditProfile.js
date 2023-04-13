import { Toast } from '@cogoport/components';
import { asyncFieldsLocations, useForm, useGetAsyncOptions } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

import { getControls } from '../utils/getControls';

function useEditProfile({ vendor_details = {}, refetchVendorInfo = () => {}, setShowEditProfileModal = () => {} }) {
	const countryOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));

	const cityOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['city'] } },
	}));

	const fields = getControls({
		countryOptions,
		cityOptions,
	});

	const newFields = [];

	fields.forEach((field) => {
		let newFieldItem = { ...field };

		if (newFieldItem.name === 'registration_proof_url') {
			newFieldItem = {
				...newFieldItem,
				style: {
					flexBasis: '100%',
				},

			};
		}
		if (newFieldItem.name !== 'registration_number') {
			newFields.push(newFieldItem);
		}
	});

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		setValue,
	} = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : 'update_vendor',
		method : 'post',
	}, { manual: true });

	const onSubmit = async () => {
		const values = getValues();

		try {
			await trigger({
				data: {
					id                     : vendor_details?.id,
					country_id             : values?.country_id,
					business_name          : values?.business_name,
					company_type           : values?.company_type,
					registration_proof_url : values?.registration_proof_url?.finalUrl,
					city_id                : values?.city_id,
				},
			});

			setShowEditProfileModal(false);

			refetchVendorInfo();

			Toast.success('Updated successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	useEffect(() => {
		fields.forEach((field) => {
			setValue(`${field.name}`, vendor_details?.[field.name]);
		});
	}, [fields, setValue, vendor_details]);

	return {
		newFields,
		control,
		handleSubmit,
		onSubmit,
		errors,
		editProfileLoading: loading,
	};
}

export default useEditProfile;
