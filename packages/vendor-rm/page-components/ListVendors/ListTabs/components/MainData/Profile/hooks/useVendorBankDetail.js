import { Toast } from '@cogoport/components';
import { asyncFieldsLocations, useForm, useGetAsyncOptions } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import useRequest from '@cogoport/request/hooks/useRequest';
import { useSelector } from '@cogoport/store';
import { merge } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getControls from '../../../../../../OnBoardVendor/PaymentDetails/utils/controls';

const API_MAPPING = {
	ifsc  : { api: '/get_bank_details', code_name: 'ifsc_code' },
	swift : { api: '/get_organization_swift_code_details', code_name: 'swift_code' },
};

function useVendorBankDetail({
	refetchVendorInfo = () => {},
	data: vendorData,
}) {
	const {
		general : { query = {} },
	} = useSelector((state) => state);

	const [showAddbankModal, setShowAddbankModal] = useState(false);

	const formProps = useForm();

	const {
		control,
		formState: { errors },
		watch,
		setValue,
		handleSubmit,
		getValues,
	} = formProps;

	const tax_number = watch('tax_number');

	const { vendor_details	} = vendorData || {};

	const { country_id } = vendor_details || {};

	const { bankingCode, controls } = getControls({ country_id });

	const { vendor_id } = query;

	const codeType = watch(`${bankingCode}_code`);

	const { api, code_name } = API_MAPPING[bankingCode];

	const [{ loading: getBankDetailsLoading }, triggerGetBankDetails] = useRequest({
		url    : api,
		method : 'get',
	}, { manual: true });

	const [{ loading: createVendorBankDetailLoading }, triggerCreateVendorBankDetail] = useRequest({
		url    : '/create_vendor_bank_detail',
		method : 'post',
	}, { manual: true });

	useEffect(() => {
		const fetch_data = async () => {
			try {
				const sessionData = await triggerGetBankDetails({
					params: { [code_name]: codeType },
				});
				const { data = {} } = sessionData || {};
				setValue('branch_name', data.branch || data.branch_name || '');
				setValue('bank_name', data.bank || data.bank_name || '');
			} catch (error) {
				setValue('branch_name', '');
				setValue('bank_name', '');
			}
		};

		if (codeType) {
			fetch_data();
		}
	}, [codeType, triggerGetBankDetails, setValue, code_name]);

	const onSubmit = async () => {
		const values = getValues();

		try {
			const payload = {
				...values,
				bank_document_url : values.bank_document_url.finalUrl,
				tax_document_url  : values.bank_document_url.finalUrl,
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
