import { Toast } from '@cogoport/components';
import { asyncFieldsLocations, useForm, useGetAsyncOptions } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import useRequest from '@cogoport/request/hooks/useRequest';
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

// eslint-disable-next-line import/no-cycle
import TABS_MAPPING from '../../../../constants/tabs';
import { controls } from '../utils/controls';

function useVendorBankDetail({ setActiveStepper = () => {} }) {
	const formProps = useForm();

	const {
		control,
		formState: { errors },
		watch,
		setValue,
		handleSubmit,
		getValues,
	} = formProps;

	const ifscCode = watch('ifsc_code');

	const [{ loading: getBankDetailsLoading }, triggerGetBankDetails] = useRequest({
		url    : '/get_bank_details',
		method : 'get',
	}, { manual: false });

	const [{ loading: createVendorBankDetailLoading }, triggerCreateVendorBankDetail] = useRequest({
		url    : '/create_vendor_bank_detail',
		method : 'post',
	}, { manual: false });

	const regex = /^[A-Za-z]{4}\d{7}$/;

	const setIfscCode = async () => {
		if (ifscCode?.match(regex)) {
			try {
				const sessionData = await triggerGetBankDetails({
					params: { ifsc_code: ifscCode },
				});
				const { data = {} } = sessionData || {};
				const { branch = '', bank = '' } = data || {};
				setValue('branch_name', branch);
				setValue('bank_name', bank);
			} catch (error) {
				setValue('branch_name', '');
				setValue('bank_name', '');
				Toast.error(getApiErrorString(error.response.data));
			}
		} else {
			setValue('branch_name', '');
			setValue('bank_name', '');
		}
	};

	useEffect(() => {
		setIfscCode();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ifscCode]);

	const onSubmit = async (step) => {
		const values = getValues();

		try {
			const response = await triggerCreateVendorBankDetail({
				data: {
					...values,
					bank_document_url : values.bank_document_url.finalUrl,
					vendor_id         : '19fd89fa-4b3a-41ae-ba61-c48b166821dd',
				},
			 	});

			 if (response?.data) {
				Toast.success('Vendor Bank Detail added successfully');
				setActiveStepper(TABS_MAPPING[step]);
			 }
		} catch (err) {
			// Toast.error(getApiErrorString(err?.response?.data) || 'Failed to login, please try again...');
		}
	};

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
		controls : newControls,
		control,
		errors,
		loading  : getBankDetailsLoading || createVendorBankDetailLoading,
		handleSubmit,
		onSubmit,
	};
}

export default useVendorBankDetail;
