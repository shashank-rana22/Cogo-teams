import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getFormattedData from '../utils/getFormattedData';

const useGetShipmentCostSheet = ({
	ShipmentId = '', jobNumber = '',
	JOB_SOURCE:jobSource = '', JOB_TYPE : jobType = '',
}) => {
	const [{ data:postTaxData, loading:postTaxLoading }, postTaxFetch] = useRequestBf(
		{
			url     : '/common/job/post-tax/profit',
			method  : 'get',
			authKey : 'get_common_job_post_tax_profit',
			params  : { jobType, jobSource, jobNumber },
		},
		{ manual: true },
	);
	const [{ data:preTaxData, loading:preTaxLoading }, preTaxFetch] = useRequestBf(
		{
			url     : '/common/job/pre-tax/profit',
			method  : 'get',
			authKey : 'get_common_job_pre_tax_profit',
			params  : { jobType, jobSource, jobNumber },
		},
		{ manual: true },
	);
	const [{ data:sellData, loading:sellLoading }, sellTrigger] = useRequestBf(
		{
			url     : '/common/job/list-service-charges',
			method  : 'get',
			authKey : 'get_common_job_list_service_charges',
			params  : { jobType, jobSource, jobNumber, chargeType: 'sell' },
		},
		{ manual: true },
	);
	const [{ data:buyData, loading:buyLoading }, buyTrigger] = useRequestBf(
		{
			url     : '/common/job/list-service-charges',
			method  : 'get',
			authKey : 'get_common_job_list_service_charges',
			params  : { jobType, jobSource, jobNumber, chargeType: 'buy' },
		},
		{ manual: true },
	);

	const [{ data:jobData, jobLoading }, triggerJob] = useRequestBf(
		{
			url     : '/common/job/job-with-quotations',
			method  : 'get',
			authKey : 'get_common_job_job_with_quotations',
			params  : { jobType, jobSource, jobNumber },
		},
		{ manual: true },
	);

	const apiTrigger = useCallback(async () => {
		try {
			await sellTrigger();
			await buyTrigger();
			postTaxFetch();
			preTaxFetch();
			triggerJob();
		} catch (error) {
			Promise.reject(error);
		}
	}, [sellTrigger, buyTrigger, postTaxFetch, preTaxFetch, triggerJob]);

	useEffect(() => {
		apiTrigger();
	}, [ShipmentId, apiTrigger]);

	const {
		formattedBuyData,
		sellQuotationData,
	} = getFormattedData({ sell_quotation: sellData, buy_quotation: buyData });

	return {
		selldata   : sellQuotationData,
		buydata    : formattedBuyData,
		sellData,
		buyData,
		jobData,
		apiloading : sellLoading || buyLoading,
		postTaxData,
		preTaxData,
		preTaxLoading,
		postTaxLoading,
		jobLoading,
	};
};

export default useGetShipmentCostSheet;
