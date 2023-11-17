import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import toastApiError from '../../commons/toastApiError';

const useOpenInvoicesReport = ({ organizationId = '' }) => {
	const [{ loading: isDownloading = false }, trigger] = useRequestBf(
		{
			url     : '/payments/outstanding/open-invoices-report',
			method  : 'get',
			authKey : 'get_payments_outstanding_open_invoices_report',
		},
		{ manual: true },
	);

	const downloadAROustanding = async () => {
		try {
			const response = await trigger({
				params: {
					organizationId,
				},
			});
			const { data: downloadUrl = '' } = response || {};

			if (!isEmpty(downloadUrl)) {
				window.open(downloadUrl);
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		isDownloading,
		downloadAROustanding,
	};
};

export default useOpenInvoicesReport;
