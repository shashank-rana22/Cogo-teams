import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useSubmitFormDetails({ formData }) {
	const { api_url } = formData || {};

	const [{ loading }, trigger] = useRequest({
		url    : `${api_url}`,
		method : 'post',
	}, { manual: true });

	const onSubmitDetails = async (data) => {
		try {
			await trigger({
				data: {
					...data,
				},
			});

			Toast.success('Details submitted succesfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		onSubmitDetails,
	};
}
export default useSubmitFormDetails;
