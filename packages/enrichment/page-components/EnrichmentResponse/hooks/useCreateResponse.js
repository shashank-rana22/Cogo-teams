import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import getUserControls from '../../../configurations/get-controls';

function useCreateResponse(props) {
	const {
		type,
		refetch,
		activeTab,
		setShowAddPoc,
	} = props;

	const {	profile = {} } = useSelector((state) => state);

	const router = useRouter();

	const { query = {} } = router;

	const controls = getUserControls({ activeTab });

	const formProps = useForm();

	const { control, handleSubmit, formState: { errors } } = formProps;

	const [{ loading }, trigger] = useAllocationRequest({

		url     : '/feedback_response',
		method  : 'POST',
		authkey : 'post_allocation_feedback_response',

	}, { manual: true });

	const onSave = async (values = {}) => {
		try {
			const payload = {

				...values,
				...(activeTab === 'user' && {
					mobile_country_code           : values?.mobile_number?.country_code,
					mobile_number                 : values?.mobile_number?.number,
					alternate_mobile_country_code : values?.alternate_mobile_number?.country_code,
					alternate_mobile_number       : values?.alternate_mobile_number?.number,
					whatsapp_country_code         : values?.whatsapp_number?.country_code,
					whatsapp_number               : values?.whatsapp_number?.number,
				}),
				response_type       : activeTab,
				source              : 'manual',
				feedback_request_id : query?.id,

				// ! Romove this before merge
				performed_by_type : 'agent',
				performed_by_id   : profile.user?.id,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Response Submitted Successfully');

			if (type === 'addPoc') {
				setShowAddPoc(false);
			}

			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		controls,
		control,
		errors,
		onSave,
		handleSubmit,
		loading,
	};
}

export default useCreateResponse;
