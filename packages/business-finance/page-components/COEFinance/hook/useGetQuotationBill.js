import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError.ts';
import { quotationConfig } from '../configurations/ShipmentIdView/quotationConfig';

function useGetQuotation({ jobNumber = '', amountTab = '' }) {
	const [
		{ data: apiData, loading: quotationApiLoading },
		trigger,
	] = useRequestBf(
		{
			url     : '/common/job-profitability/get-quotations',
			method  : 'get',
			authKey : 'get_common_job_profitability_get_quotations',
		},
		{ manual: true, autoCancel: false },
	);

	const QUOTATION_TYPE_MAPPING = {
		sellQuote : 'SELL',
		buyQuote  : 'BUY',
	};

	const getQuotationData = async () => {
		try {
			trigger({
				params: {
					jobNumber,
					quotationType: QUOTATION_TYPE_MAPPING[amountTab],
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		quotationLoading : quotationApiLoading,
		quoteData        : apiData,
		quoteConfig      : quotationConfig,
		getQuotationData,
	};
}
export default useGetQuotation;
