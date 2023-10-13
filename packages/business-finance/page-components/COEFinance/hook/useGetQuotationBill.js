import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError';
import quotationConfig from '../configurations/ShipmentIdView/quotationConfig.json';

const QUOTATION_TYPE_MAPPING = {
	sellQuote : 'SELL',
	buyQuote  : 'BUY',
};

function useGetQuotation({ jobNumber = '', amountTab = '', isCheckoutQuote = false }) {
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

	const getFormattedData = (dataList) => {
		if (isCheckoutQuote && amountTab === 'sellQuote') {
			return dataList?.firstSellQuotationLineItems;
		}
		return dataList?.lineItems;
	};

	return {
		quotationLoading : quotationApiLoading,
		quoteData        : getFormattedData(apiData),
		quoteConfig      : quotationConfig,
		getQuotationData,
	};
}

export default useGetQuotation;
