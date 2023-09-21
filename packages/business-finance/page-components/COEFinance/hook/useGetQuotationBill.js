import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError.ts';
import { quotationConfig } from '../configurations/ShipmentIdView/quotationConfig';

const QUOTATION_TYPE_MAPPING = {
	sellQuote : 'SELL',
	buyQuote  : 'BUY',
};

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

	// getFormattedData -> filtering 'isDeleted' data rows and combining lineItems array inside each row
	const getFormattedData = (dataList) => (dataList || [])
		.filter((item) => item?.isDeleted === false)
		?.flatMap((item) => item?.lineItems || []);

	return {
		quotationLoading : quotationApiLoading,
		quoteData        : getFormattedData(apiData),
		quoteConfig      : quotationConfig,
		getQuotationData,
	};
}
export default useGetQuotation;
