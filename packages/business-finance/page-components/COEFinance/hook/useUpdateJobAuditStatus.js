import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError';

const useUpdateJobAuditStatus = ({
	active_tab = '',
}) => {
	const { push = () => {} } = useRouter();
	const [{ loading = false }, trigger] = useRequestBf({
		url     : '/common/job-profitability/audit-job-profitability',
		method  : 'POST',
		authKey : 'post_common_job_profitability_audit_job_profitability',
	}, { manual: true });

	const updateJobAuditStatus = async (params) => {
		try {
			await trigger({
				data: { ...params },
			});
			Toast.success('Success');
			if (active_tab === 'financial_close') {
				push(
					'/business-finance/audit-function/financial_close',
				);
			} else {
				push(
					'/business-finance/audit-function/operational_close',
				);
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		updateJobAuditStatus,
		loading,
	};
};
export default useUpdateJobAuditStatus;
