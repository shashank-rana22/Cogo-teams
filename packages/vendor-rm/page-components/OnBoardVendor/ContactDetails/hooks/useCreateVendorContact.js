/* eslint-disable import/no-cycle */
import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

import TABS_MAPPING from '../../../../constants/tabs';
import COMPONENT_MAPPING from '../../../../utils/component-mapping';
import getControls from '../utils/getControls';

function useCreateVendorContact({
	setActiveStepper = () => {},
	vendorInformation = {},
	setVendorInformation = () => {},
}) {
	const fields = getControls();

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		setValue,
	} = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_vendor_poc',
		method : 'post',
	}, { manual: true });

	const createVendorContact = async ({ data, step }) => {
		const formattedValues = getValues();

		setVendorInformation((pv) => {
			const { key = '' } = COMPONENT_MAPPING.find((item) => item.step === step);
			return {
				...pv,
				[key]: data,
			};
		});

		const payload = {
			...formattedValues,
			vendor_id             : vendorInformation?.vendor_details?.id,
			vendor_poc_proof      : formattedValues?.contact_proof_url?.finalUrl,
			mobile_country_code   : formattedValues?.mobile_number?.country_code,
			mobile_number         : formattedValues?.mobile_number?.number,
			whatsapp_country_code : formattedValues?.whatsapp_number?.country_code,
			whatsapp_number       : formattedValues?.whatsapp_number?.number,
		};

		try {
			const res = await trigger({ data: { ...payload } });

			if (res?.data) {
				Toast.success('Vendor Contact Created Successfully');
				setActiveStepper('vendor_services');
			}
		} catch (error) {
			Toast.error('Something went wrong');
		}
	};

	useEffect(() => {
		fields.forEach((field) => {
			if (field.type === 'file') {
				setValue(`${field.name}`, vendorInformation?.vendor_pocs?.[field.name]?.finalUrl);
			} else {
				setValue(`${field.name}`, vendorInformation?.vendor_pocs?.[field.name]);
			}
		});
	}, []);

	const handleBackLink = (step) => {
		setActiveStepper(TABS_MAPPING[step]);
	};

	return {
		fields,
		control,
		errors,
		createVendorContact,
		handleSubmit,
		loading,
		setActiveStepper,
		handleBackLink,
	};
}

export default useCreateVendorContact;
