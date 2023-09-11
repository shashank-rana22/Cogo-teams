import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

import toastApiError from '../../commons/toastApiError.ts';
import { quotationConfig } from '../configurations/ShipmentIdView/quotationConfig';

function useGetQuotation({ jobNumber = '', quotationType = '' }) {
	const [
		{ data: apiData, loading: quotationApiLoading },
		trigger,
	] = useRequestBf(
		{
			url     : '/common/job-profitability/get-quotations',
			method  : 'get',
			authKey : 'get_common_job-profitability_get-quotations',
		},
		{ manual: true, autoCancel: false },
	);

	useEffect(() => {
		const getContent = async () => {
			try {
				trigger({
					params: {
						jobNumber,
						quotationType,
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		};
		if (jobNumber) { getContent(); }
	}, [jobNumber, quotationType, trigger]);

	return {
		quotationLoading : quotationApiLoading,
		quoteData        : apiData,
		quoteConfig      : quotationConfig,
	};
}
export default useGetQuotation;
