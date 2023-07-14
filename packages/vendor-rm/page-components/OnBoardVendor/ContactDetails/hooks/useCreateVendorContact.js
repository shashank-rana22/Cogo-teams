import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import COMPONENT_MAPPING from '../../../../utils/component-props-mapping';
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
			is_primary            : true,
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
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

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
