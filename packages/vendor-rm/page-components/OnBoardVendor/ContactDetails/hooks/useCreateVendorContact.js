/* eslint-disable import/no-cycle */
import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import COMPONENT_MAPPING from '../../../../utils/component-mapping';
import controls from '../utils/controls';

function useCreateVendorContact({
	setActiveStepper = () => {},
	vendorInformation = {},
	setVendorInformation = () => {},
}) {
	const { general: { query } } = useSelector((state) => state);

	const { vendor_id } = query;

	const { contact_details = {} } = vendorInformation || {};

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		setValue,
	} = useForm();

	const isUpdateAction = !isEmpty(contact_details);

	const [{ loading }, trigger] = useRequest({
		url    : isUpdateAction ? '/update_vendor_poc' : '/create_vendor_poc',
		method : 'post',
	}, { manual: true });

	const createVendorContact = async ({ data, step }) => {
		const formattedValues = getValues();

		const payload = {
			...formattedValues,
			vendor_id,
			vendor_poc_proof      : formattedValues?.contact_proof_url?.finalUrl,
			mobile_country_code   : formattedValues?.mobile_number?.country_code,
			mobile_number         : formattedValues?.mobile_number?.number,
			whatsapp_country_code : formattedValues?.whatsapp_number?.country_code,
			whatsapp_number       : formattedValues?.whatsapp_number?.number,
		};

		try {
			const res = await trigger({ data: { ...payload } });

			setVendorInformation((pv) => {
				const { key = '' } = COMPONENT_MAPPING.find((item) => item.step === step);
				return {
					...pv,
					[key]: data,
				};
			});

			if (res?.data) {
				Toast.success(`Contact ${isUpdateAction ? 'updated' : 'created'} Successfully`);

				setActiveStepper('vendor_services');
			}
		} catch (error) {
			Toast.error('Something went wrong');
		}
	};

	useEffect(() => {
		controls.forEach((field) => {
			if (field.type === 'file') {
				setValue(`${field.name}`, contact_details?.[field.name]?.finalUrl);
			} else {
				setValue(
					`${field.name}`,
					contact_details?.[field.name],
				);
			}
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vendorInformation]);

	return {
		fields: controls,
		control,
		errors,
		createVendorContact,
		handleSubmit,
		loading,
		setActiveStepper,
	};
}

export default useCreateVendorContact;
