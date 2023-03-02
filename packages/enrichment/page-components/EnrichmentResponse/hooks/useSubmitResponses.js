import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const possibleResponseKeys = {
	user: ['name', 'email', 'mobile_number', 'mobile_country_code', 'whatsapp_number',
		'whatsapp_country_code', 'alternate_mobile_number', 'alternate_mobile_country_code', 'work_scopes'],

	address: ['tax_number', 'address', 'pincode', 'city', 'state', 'country'],
};

const useSubmitResponses = (props) => {
	const {
		profile = {},
	} = useSelector((state) => state);

	const router = useRouter();
	const { query = {} } = router;
	const { responses = [], refetch, activeTab } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/feedback_response_bulk_create',
		method  : 'POST',
		authkey : 'post_allocation_feedback_response_bulk_create',
	}, { manual: true });

	const handleResponseSubmit = async () => {
		try {
			const newResponses = responses.map((response) => {
				const filteredResponse = {};

				possibleResponseKeys[activeTab].forEach((key) => {
					if (Object.keys(response).includes(key)) {
						filteredResponse[key] = response[key];
					}
				});
				return filteredResponse;
			});

			await trigger({
				data: {
					responses           : newResponses,
					response_type       : activeTab,
					source              : 'manual',
					feedback_request_id : query?.id,

					// ! Romove this before merge
					performed_by_type : 'agent',
					performed_by_id   : profile.user?.id,

				},
			});

			Toast.success('Response Submitted Successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
		refetch();
	};

	return {
		handleResponseSubmit,
		loadingSubmit: loading,
	};
};

export default useSubmitResponses;
