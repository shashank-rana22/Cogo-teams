import { Toast } from '@cogoport/components';
import { asyncFieldsLocations, useForm, useGetAsyncOptions } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import useRequest from '@cogoport/request/hooks/useRequest';
import { useSelector } from '@cogoport/store';
import { merge } from '@cogoport/utils';
import { useEffect, useCallback, useState } from 'react';

import getControls from '../../../../../../OnBoardVendor/PaymentDetails/utils/controls';

function useVendorBankDetail({
	refetchVendorInfo = () => {},
	data: vendorData,
}) {
	const {
		general : { query = {} },
	} = useSelector((state) => state);

	const { vendor_details	} = vendorData || {};

	const { country_id } = vendor_details || {};

	const [showAddbankModal, setShowAddbankModal] = useState(false);

	const { vendor_id } = query;

	const [{ loading: getBankDetailsLoading }, triggerGetBankDetails] = useRequest({
		url    : '/get_bank_details',
		method : 'get',
	}, { manual: true });

	const [{ loading: createVendorBankDetailLoading }, triggerCreateVendorBankDetail] = useRequest({
		url    : '/create_vendor_bank_detail',
		method : 'post',
	}, { manual: true });

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
	const tax_number = watch('tax_number');

	const setIfscCode = useCallback(async () => {
		const REGEX = GLOBAL_CONSTANTS.regex_patterns.ifsc_code;

		if (ifscCode?.match(REGEX)) {
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
			}
		} else {
			setValue('branch_name', '');
			setValue('bank_name', '');
		}
	}, [ifscCode, setValue, triggerGetBankDetails]);

	useEffect(() => {
		setIfscCode();
	}, [ifscCode, setIfscCode]);

	const onSubmit = async () => {
		const values = getValues();

		try {
			const payload = {
				...values,
				bank_document_url: values.bank_document_url.finalUrl,
				vendor_id,
			};

			await triggerCreateVendorBankDetail({
				data: payload,
			});

			setShowAddbankModal(false);

			Toast.success('Bank Details added successfully');

			refetchVendorInfo();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Failed to update, please try again...');
		}
	};

	const pincodeOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		initialCall: false, params: { filters: { type: ['pincode'] } },
	}));

	const { controls } = getControls({ country_id });

	const newControls = (controls || []).map((controlItem) => {
		const { name } = controlItem;
		let newControl = { ...controlItem };

		if (name === 'pincode_id') {
			newControl = { ...newControl, ...pincodeOptions };
		}

		newControl = {
			...newControl,
			style: {
				flexBasis: '44%',
			},
		};

		if (name === 'tax_document_url' && tax_number) {
			newControl = { ...newControl, rules: { required: 'GST Proof is Required' } };
		}

		return {
			...newControl,
		};
	});

	return {
		controls : newControls,
		control,
		errors,
		loading  : getBankDetailsLoading || createVendorBankDetailLoading,
		handleSubmit,
		showAddbankModal,
		setShowAddbankModal,
		onSubmit,
	};
}

export default useVendorBankDetail;
