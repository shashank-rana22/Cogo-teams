import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

// eslint-disable-next-line import/no-cycle
import TABS_MAPPING from '../../../../constants/tabs';
import { getControls } from '../utils/getControls';

function useCreateVendorContact({ setActiveStepper = () => {} }) {
	const fields = getControls();

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_vendor_poc',
		method : 'post',
	}, { manual: true });

	const createVendorContact = async (step) => {
		const formattedValues = getValues();

		const payload = {
			...formattedValues,
			vendor_poc_proof      : formattedValues?.contact_proof_url?.finalUrl,
			vendor_id             : 'e7c29f98-3322-49ca-8363-77647e90c54c',
			mobile_country_code   : formattedValues?.mobile_number?.country_code,
			mobile_number         : formattedValues?.mobile_number?.number,
			whatsapp_country_code : formattedValues?.whatsapp_number?.country_code,
			whatsapp_number       : formattedValues?.whatsapp_number?.number,
		};

		try {
			const res = await trigger({ data: { ...payload } });

			if (res?.data) {
				Toast.success('Vendor Contact Created Successfully');
				setActiveStepper(TABS_MAPPING[step]);
			}
		} catch (error) {
			Toast.error('Something went wrong');
		}
	};

	return {
		fields,
		control,
		errors,
		createVendorContact,
		handleSubmit,
		loading,
		setActiveStepper,
	};
}

export default useCreateVendorContact;
