import { useRequest } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError';

const useSendOutstandingReport = () => {
	const [
		{ loading },
		trigger,
	] = useRequest(
		{
			url    : '/send_cc_outstanding_report',
			method : 'POST',
		},
		{ manual: true },
	);

	const downloadOsReport = async () => {
		try {
			await trigger({});
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		downloadOsReport,
		loading,
	};
};

export default useSendOutstandingReport;
