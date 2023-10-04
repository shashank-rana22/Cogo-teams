import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ id }) => ({
	id,
	status: 'inactive',
});

function useUpdateCommunicationTemplate({ handleRefreshTemplates = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_communication_template',
		method : 'post',
	}, { manual: true });

	const deleteCommunicationTemplate = async ({ id }) => {
		try {
			await trigger({
				data: getPayload({ id }),
			});

			handleRefreshTemplates();

			Toast.success('Successfully Deleted');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something Went Wrong');
		}
	};

	return {
		deleteCommunicationTemplate,
		deleteLoading: loading,
	};
}

export default useUpdateCommunicationTemplate;
