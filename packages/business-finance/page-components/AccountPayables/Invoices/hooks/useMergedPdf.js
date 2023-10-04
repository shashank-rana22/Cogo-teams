import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../../commons/toastApiError.js';

const useMergedPdf = ({ generateInvoice = () => {} }) => {
	const { query = {} } = useSelector(({ general }) => ({ query: general.query }));
	const { payrun = '' } = query || {};

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : `/purchase/payrun/merged-pdf/${payrun}`,
			method  : 'post',
			authKey : 'post_purchase_payrun_merged_pdf',
		},
		{ manual: false },
	);

	const mergeInvoices = async () => {
		try {
			await trigger({ data: {} });
			generateInvoice();
		} catch (e) {
			toastApiError(e);
		}
	};

	return {
		loadingMerged: loading,
		mergeInvoices,
	};
};

export default useMergedPdf;
