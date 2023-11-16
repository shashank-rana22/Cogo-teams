import { useRequest } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError';

const useSyncSageArOutstanding = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/sync_sage_ar_outstanding',
		method : 'POST',
	},	{ manual: true });

	const syncSageArOutstanding = async (val) => {
		try {
			await trigger({
				data: { sync_report: val || false },

			});
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		syncSageArOutstanding,
		loading,
	};
};

export default useSyncSageArOutstanding;
