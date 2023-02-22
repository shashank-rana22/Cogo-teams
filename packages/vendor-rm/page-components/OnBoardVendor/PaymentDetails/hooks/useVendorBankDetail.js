/* eslint-disable import/no-cycle */
import { Toast } from '@cogoport/components';
import { asyncFieldsLocations, useForm, useGetAsyncOptions } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import useRequest from '@cogoport/request/hooks/useRequest';
import { useSelector } from '@cogoport/store';
import { isEmpty, merge } from '@cogoport/utils';
import { useEffect } from 'react';

// import TABS_MAPPING from '../../../../constants/tabs';
import COMPONENT_MAPPING from '../../../../utils/component-mapping';
import { controls } from '../utils/controls';

function useVendorBankDetail({
	setActiveStepper = () => {},
	vendorInformation = {},
	setVendorInformation = () => {},
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

	const { payment_details } = vendorInformation;

	const isUpdateAction = !isEmpty(payment_details);

	const {
		general : { query = {} },
	} = useSelector((state) => state);

	const { vendor_id } = query;

	const [{ loading: getBankDetailsLoading }, triggerGetBankDetails] = useRequest({
		url    : '/get_bank_details',
		method : 'get',
	}, { manual: true });

	const [{ loading: createVendorBankDetailLoading }, triggerCreateVendorBankDetail] = useRequest({
		url    : isUpdateAction ? '/update_vendor_bank_detail' : '/create_vendor_bank_detail',
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

	const onSubmit = async ({ data, step }) => {
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

			setVendorInformation((pv) => {
				const { key = '' } = COMPONENT_MAPPING.find((item) => item.step === step);
				return {
					...pv,
					[key]: data,
				};
			});

			Toast.success(`Bank Details ${isUpdateAction ? 'updated' : 'added'} successfully`);
			setActiveStepper('verification');
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
		return { ...newControl };
	});

	useEffect(() => {
		controls.forEach((field) => {
			if (field.type === 'file') {
				setValue(`${field.name}`, payment_details?.[field.name]?.finalUrl);
			} else {
				setValue(`${field.name}`, payment_details?.[field.name]);
			}
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vendorInformation]);

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
