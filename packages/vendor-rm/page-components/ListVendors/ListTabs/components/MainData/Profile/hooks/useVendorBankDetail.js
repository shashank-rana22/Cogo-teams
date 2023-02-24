/* eslint-disable import/no-cycle */
import { Toast } from '@cogoport/components';
import { asyncFieldsLocations, useForm, useGetAsyncOptions } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import useRequest from '@cogoport/request/hooks/useRequest';
import { useSelector } from '@cogoport/store';
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

import { controls } from '../../../../../../OnBoardVendor/PaymentDetails/utils/controls';

function useVendorBankDetail({
	refetchVendorInfo = () => {},
	setShowAddbankModal = () => {},
}) {
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

	const {
		general : { query = {} },
	} = useSelector((state) => state);

	const { vendor_id } = query;

	const [{ loading: getBankDetailsLoading }, triggerGetBankDetails] = useRequest({
		url    : '/get_bank_details',
		method : 'get',
	}, { manual: true });

	const [{ loading: createVendorBankDetailLoading }, triggerCreateVendorBankDetail] = useRequest({
		url    : '/create_vendor_bank_detail',
		method : 'post',
	}, { manual: true });

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
				// Toast.error(getApiErrorString(error.response.data));
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
		onSubmit,
	};
}

export default useVendorBankDetail;
