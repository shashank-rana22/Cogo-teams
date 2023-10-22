import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useCreateCompanyFeed = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/create_company_feed',
		method : 'post',
	}, { manual: true });

	const createCompanyFeed = 	async ({ PAYLOAD }) => {
		try {
			await trigger({
				data: {
					...PAYLOAD,
				},
			});
			Toast.success('feed updated succesfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};
	return { createCompanyFeed, data, loading };
};

export default useCreateCompanyFeed;
