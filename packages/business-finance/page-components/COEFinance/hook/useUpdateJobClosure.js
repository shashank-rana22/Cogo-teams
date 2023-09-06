import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../commons/toastApiError.ts';

const useUpdateJobClosure = (
	{
		refetch = () => {},
		setSaveObj = () => {},
		setOpenConfig = () => {},
		listOfId = [],
	},
) => {
	const { user_data: UserData } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user } = UserData;
	const { id:userId } = user;

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
			Toast.success('success');
			setOpenConfig((prev) => (prev.filter((columnId) => (!listOfId.includes(columnId)))));
			setSaveObj({});
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
