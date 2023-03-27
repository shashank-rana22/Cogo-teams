import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useReceivablesDashboard = () => {
	const [filterValue, setFilterValue] = useState({
		entityCode  : '301',
		serviceType : '',
		companyType : 'All',
	});

	const [salesFunnelMonth, setSalesFunnelMonth] = useState('');

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

	const ageingBucketData = useCallback(async () => {
		try {
			listApiTrigger({
				params: {
					entityCode  : filterValue?.entityCode || undefined,
					serviceType : filterValue?.serviceType || undefined,
					companyType : filterValue.companyType !== 'All' ? filterValue.companyType : undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Something went wrong');
		}
	}, [filterValue.companyType, filterValue?.entityCode, filterValue?.serviceType, listApiTrigger]);

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

	const quaterlyDataApi = useCallback(async () => {
		try {
			quaterlyDataTrigger({
				params: {
					entityCode  : filterValue?.entityCode || undefined,
					serviceType : filterValue?.serviceType || undefined,
					companyType : filterValue.companyType !== 'All' ? filterValue.companyType : undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Something went wrong');
		}
	}, [filterValue.companyType, filterValue?.entityCode, filterValue?.serviceType, quaterlyDataTrigger]);

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

	const kamOutstandingApi = useCallback(async () => {
		try {
			kamOutstandingTrigger({
				params: {
					entityCode  : filterValue?.entityCode || undefined,
					serviceType : filterValue?.serviceType || undefined,
					companyType : filterValue.companyType !== 'All' ? filterValue.companyType : undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Something went wrong');
		}
	}, [filterValue.companyType, filterValue?.entityCode, filterValue?.serviceType, kamOutstandingTrigger]);

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

	const dailySalesOutstandingApi = useCallback(async () => {
		try {
			await dailySalesOutstandingTrigger({
				params: {
					entityCode  : filterValue?.entityCode || undefined,
					serviceType : filterValue?.serviceType || undefined,
					companyType : filterValue.companyType !== 'All' ? filterValue.companyType : undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Something went wrong');
		}
	}, [dailySalesOutstandingTrigger, filterValue.companyType, filterValue?.entityCode, filterValue?.serviceType]);

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
		try {
			await salesFunnelTrigger({
				params: {
					month       : salesFunnelMonth || undefined,
					entityCode  : filterValue?.entityCode || undefined,
					serviceType : filterValue?.serviceType || undefined,
					companyType : filterValue.companyType !== 'All' ? filterValue.companyType : undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Something went wrong');
		}
	}, [filterValue.companyType,
		filterValue?.entityCode, filterValue?.serviceType, salesFunnelMonth, salesFunnelTrigger]);

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
		try {
			await outstandingTrigger({
				params: {
					entityCode: filterValue?.entityCode || undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Something went wrong');
		}
	}, [filterValue?.entityCode, outstandingTrigger]);

	useEffect(() => {
		dailySalesOutstandingApi();
		ageingBucketData();
		quaterlyDataApi();
		kamOutstandingApi();
	}, [ageingBucketData, dailySalesOutstandingApi, filterValue, kamOutstandingApi, quaterlyDataApi]);

	useEffect(() => { outstandingApi(); }, [filterValue.entityCode, outstandingApi]);

	useEffect(() => {
		salesFunnelApi();
	}, [filterValue, salesFunnelApi, salesFunnelMonth]);

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
