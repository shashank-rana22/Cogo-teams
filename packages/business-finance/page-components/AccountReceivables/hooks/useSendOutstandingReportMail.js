import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError';

const useSendOutstandingReportMail = (registrationNumber) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/sage/send_outstanding_report_mail',
			method  : 'post',
			authKey : 'send_outstanding_report_mail',
		},
		{ manual: true },
	);

	const downloadOsReport = async () => {
		try {
			await trigger({
				data: {
					source  : 'platform',
					filters : {
						registration_number: registrationNumber,
					},
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		downloadOsReport,
		loading,
		data,
	};
};

export default useSendOutstandingReportMail;
