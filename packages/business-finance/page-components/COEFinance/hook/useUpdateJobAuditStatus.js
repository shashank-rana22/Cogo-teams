import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';

import toastApiError from '../../commons/toastApiError.ts';

const useUpdateJobAuditStatus = () => {
	// const { user_data: userData } = useSelector(({ profile }) => ({
	// 	user_data: profile || {},
	// }));

	// const { user: { id: userId } = {} } = userData || {};

	const [{ loading }, trigger] = useRequestBf({
		url     : '/common/job-profitability/audit-job-profitability',
		method  : 'POST',
		authKey : 'post_common_job_profitability_audit_job_profitability',
	}, { manual: true });

	const apiTrigger = async (params) => {
		try {
			await trigger({
				data: { ...params },
			});
			Toast.success('Success');
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};
export default useUpdateJobAuditStatus;
