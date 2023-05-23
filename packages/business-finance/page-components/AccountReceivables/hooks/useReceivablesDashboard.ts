import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useReceivablesDashboard = (entityCode: string) => {
	const [filterValue, setFilterValue] = useState({
		serviceType : '',
		companyType : 'All',
	});

	const { serviceType = '', companyType = '' } = filterValue || {};

	const d = new Date();
	const currentMonth = GLOBAL_CONSTANTS.months[d.getMonth()];

	const [salesFunnelMonth, setSalesFunnelMonth] = useState(currentMonth);

	const [
		{ data: ageingBucket, loading: ageingBucketLoading },
		listApiTrigger,
	] = useRequestBf(
		{
			url     : '/payments/dashboard/outstanding-by-age',
			method  : 'get',
			authKey : 'get_payments_dashboard_outstanding_by_age',
		},
		{ manual: true },
	);

	const ageingBucketData = useCallback(() => {
		(async () => {
			listApiTrigger({
				params: {
					entityCode  : entityCode || undefined,
					serviceType : serviceType || undefined,
					companyType : companyType !== 'All' ? companyType : undefined,
				},
			});
		})();
	}, [companyType, entityCode, serviceType, listApiTrigger]);

	const [
		{ data: quaterlyData, loading: quaterlyLoading },
		quaterlyDataTrigger,
	] = useRequestBf(
		{
			url     : '/payments/dashboard/quarterly-outstanding',
			method  : 'get',
			authKey : 'get_payments_dashboard_quarterly_outstanding',
		},
		{ manual: true },
	);

	const quaterlyDataApi = useCallback(() => {
		(async () => {
			quaterlyDataTrigger({
				params: {
					entityCode  : entityCode || undefined,
					serviceType : serviceType || undefined,
					companyType : companyType !== 'All' ? companyType : undefined,
				},
			});
		})();
	}, [companyType, entityCode, serviceType, quaterlyDataTrigger]);

	const [
		{ data: kamOutstandingData, loading: kamOutstandingLoading },
		kamOutstandingTrigger,
	] = useRequestBf(
		{
			url     : '/payments/dashboard/kam-wise-outstanding',
			method  : 'get',
			authKey : 'get_payments_dashboard_kam_wise_outstanding',
		},
		{ manual: true },
	);

	const [
		{ data: dailySalesOutstandingData, loading: dailySalesOutstandingApiLoading },
		dailySalesOutstandingTrigger,
	] = useRequestBf(
		{
			url     : '/payments/dashboard/daily-sales-outstanding',
			method  : 'get',
			authKey : 'get_payments_dashboard_daily_sales_outstanding',
		},
		{ manual: true },
	);

	const dailySalesOutstandingApi = useCallback(() => {
		(async () => {
			await dailySalesOutstandingTrigger({
				params: {
					entityCode  : entityCode || undefined,
					serviceType : serviceType || undefined,
					companyType : companyType !== 'All' ? companyType : undefined,
				},
			});
		})();
	}, [dailySalesOutstandingTrigger, companyType, entityCode, serviceType]);

	const [
		{ data: salesFunnelData, loading: salesFunnelLoading },
		salesFunnelTrigger,
	] = useRequestBf(
		{
			url     : '/payments/dashboard/sales-funnel',
			method  : 'get',
			authKey : 'get_payments_dashboard_sales_funnel',
		},
		{ manual: true },
	);

	const salesFunnelApi = useCallback(async () => {
		await salesFunnelTrigger({
			params: {
				month       : salesFunnelMonth || undefined,
				entityCode  : entityCode || undefined,
				serviceType : serviceType || undefined,
				companyType : companyType !== 'All' ? companyType : undefined,
			},
		});
	}, [companyType,
		entityCode, serviceType, salesFunnelMonth, salesFunnelTrigger]);

	const [
		{ data: outstandingData, loading: outstandingLoading },
		outstandingTrigger,
	] = useRequestBf(
		{
			url     : '/payments/dashboard/outstanding',
			method  : 'get',
			authKey : 'get_payments_dashboard_outstanding',
		},
		{ manual: true },
	);

	const outstandingApi = useCallback(async () => {
		await outstandingTrigger({
			params: {
				entityCode: entityCode || undefined,
			},
		});
	}, [entityCode, outstandingTrigger]);

	useEffect(() => {
		dailySalesOutstandingApi();
		ageingBucketData();
		quaterlyDataApi();
	}, [ageingBucketData, dailySalesOutstandingApi, quaterlyDataApi]);

	useEffect(() => {
		kamOutstandingTrigger();
	}, [kamOutstandingTrigger]);

	useEffect(() => { outstandingApi(); }, [outstandingApi]);

	useEffect(() => {
		salesFunnelApi();
	}, [salesFunnelApi]);

	const dashboard = {
		outstandingAgeData        : ageingBucket,
		quaterly                  : quaterlyData?.list,
		dailySalesOutstandingData : dailySalesOutstandingData?.dsoResponse,
		kamOutstandingData,
		outstandingData,
		salesFunnelData,
	};
	const loading = {
		outstandingAgeData : ageingBucketLoading,
		quaterly           : quaterlyLoading,
		dailySalesOutstandingApiLoading,
		kamOutstandingLoading,
		outstandingLoading,
		salesFunnelLoading,
	};
	return {
		salesFunnelMonth,
		setSalesFunnelMonth,
		dashboard,
		loading,
		filterValue,
		setFilterValue,
	};
};
export default useReceivablesDashboard;
