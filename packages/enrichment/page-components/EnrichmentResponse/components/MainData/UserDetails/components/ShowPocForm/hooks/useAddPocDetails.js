import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import controls from '../utils/controls';

const useAddPocDetails = ({
	setShowForm = () => {},
	refetchResponses = () => {},
}) => {
	const router = useRouter();
	const partnerId = useSelector((state) => (state.profile?.partner?.id));

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm();

	const { query = {} } = router;

	const [{ loading }, trigger] = useAllocationRequest({

		url     : '/feedback_response',
		method  : 'POST',
		authkey : 'post_allocation_feedback_response',

	}, { manual: true });

	const onSubmit = async () => {
		const values = getValues();

		try {
			const payload = {

				...values,

				mobile_country_code : values?.mobile_number?.country_code,
				mobile_number       : values?.mobile_number?.number,

				alternate_mobile_country_code: !isEmpty(values?.alternate_mobile_number?.country_code)
					? values?.alternate_mobile_number?.country_code : undefined,

				alternate_mobile_number: values?.alternate_mobile_number?.number,

				whatsapp_country_code: !isEmpty(values?.whatsapp_number?.country_code)
					? values?.whatsapp_number?.country_code : undefined,

				whatsapp_number: values?.whatsapp_number?.number,

				response_type : 'user',
				source        : GLOBAL_CONSTANTS.country_entity_ids.VN === partnerId
					? 'manual_enriched' : 'manual',
				feedback_request_id: query?.id,
			};

			await trigger({
				data: payload,
			});

			Toast.success('POC Added Successfully');

			setShowForm(false);

			refetchResponses();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Failed to add new poc, please try again...');
		}
	};

	return {
		loading,
		controls,
		errors,
		control,
		handleSubmit,
		onSubmit,

	};
};

export default useAddPocDetails;
