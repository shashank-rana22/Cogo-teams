import { Toast } from '@cogoport/components';
import { asyncFieldsLocations, useForm, useGetAsyncOptions } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import useRequest from '@cogoport/request/hooks/useRequest';
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

import { controls } from '../utils/controls';

function useVendorBankDetail() {
	const formProps = useForm();

	const {
		control,
		formState: { errors },
		watch,
		setValue,
	} = formProps;

	const ifscCode = watch('ifsc_code');

	const [{ loading }, trigger] = useRequest({
		url    : '/get_bank_details',
		method : 'get',
	}, { manual: true });

	const regex = /^[A-Za-z]{4}\d{7}$/;

	const setIfscCode = async () => {
		if (ifscCode?.match(regex)) {
			try {
				const sessionData = await trigger({
					params: { ifsc_code: ifscCode },
				});
				const { data = {} } = sessionData || {};
				const { branch = '' } = data || {};
				setValue('branch_name', branch);
			} catch (error) {
				setValue('branch_name', '');
				Toast.error(getApiErrorString(error.response.data));
			}
		}
	};

	useEffect(() => {
		setIfscCode();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ifscCode]);

	const pincodeOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		initialCall: false, params: { filters: { type: ['pincode'] } },
	}));

	const newControls = (controls || []).map((controlItem) => {
		const { name } = controlItem;
		let newControl = { ...controlItem };

		if (name === 'pincode_id') {
			newControl = { ...newControl, ...pincodeOptions };
		}
		return { ...newControl };
	});

	return {
		controls: newControls,
		control,
		errors,
		loading,
	};
}

export default useVendorBankDetail;
