import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../commons/toastApiError.ts';

const useUpdateJobClosure = (
	{
		refetch = () => {},
	},
) => {
	const { user_data: userData } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const { user: { id: userId } = {} } = userData || {};

	const [{ loading }, trigger] = useRequestBf({
		url    : '/common/job/edit-job-closure-rule',
		method : 'PUT',
	}, { manual: true });

	const apiTrigger = async (params) => {
		try {
			await trigger({
				data: {
					list        : params,
					performedBy : userId,
				},
			});
			Toast.success('Success');
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};
export default useUpdateJobClosure;
