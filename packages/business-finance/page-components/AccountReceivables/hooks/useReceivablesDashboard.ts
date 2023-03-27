/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const useReceivablesDashboard = () => {
	const { userData } = useSelector(({ profile }) => ({
		userData: profile || {},
	}));
	const [asOnDateFilter, setAsOnDateFilter] = useState(null);

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

	const ageingBucketData = async () => {
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
	};

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

	const quaterlyDataApi = async () => {
		try {
			quaterlyDataTrigger({
				params: {
					role: userData.id,
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Something went wrong');
		}
	};

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

	const kamOutstandingApi = async () => {
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
	};

	const [
		{ data: monthlyData, loading: monthlyLoading },
		monthlyDataTrigger,
	] = useRequestBf(
		{
			url     : '/payments/dashboard/monthly-outstanding',
			method  : 'get',
			authKey : 'get_payments_dashboard_monthly_outstanding',
		},
		{ manual: true },
	);

	const monthlyDataApi = async () => {
		try {
			monthlyDataTrigger({
				params: {
					role              : userData.id,
					dashboardCurrency : 'INR',
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Something went wrong');
		}
	};

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

	const dailySalesOutstandingApi = () => {
		try {
			dailySalesOutstandingTrigger({
				params: {
					entityCode  : filterValue?.entityCode || undefined,
					serviceType : filterValue?.serviceType || undefined,
					companyType : filterValue.companyType !== 'All' ? filterValue.companyType : undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Something went wrong');
		}
	};

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

	const salesFunnelApi = () => {
		try {
			salesFunnelTrigger({
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
	};

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

	const outstandingApi = () => {
		try {
			outstandingTrigger({
				params: {
					date: asOnDateFilter ? format(asOnDateFilter, 'YYYY-MM-dd ', {}, false) : undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Something went wrong');
		}
	};

	useEffect(() => {
		dailySalesOutstandingApi();
		monthlyDataApi();
		ageingBucketData();
		quaterlyDataApi();
		kamOutstandingApi();
	}, [filterValue]);

	useEffect(() => { outstandingApi(); }, [asOnDateFilter]);

	useEffect(() => {
		salesFunnelApi();
	}, [filterValue, salesFunnelMonth]);

	const dashboard = {
		outstandingAgeData        : ageingBucket,
		quaterly                  : quaterlyData?.list,
		monthly                   : monthlyData?.list,
		dailySalesOutstandingData : dailySalesOutstandingData?.dsoResponse,
		kamOutstandingData,
		outstandingData,
		salesFunnelData,
	};
	const loading = {
		outstandingAgeData : ageingBucketLoading,
		quaterly           : quaterlyLoading,
		monthly            : monthlyLoading,
		dailySalesOutstandingApiLoading,
		kamOutstandingLoading,
		outstandingLoading,
		salesFunnelLoading,
	};
	return {
		salesFunnelMonth,
		setSalesFunnelMonth,
		asOnDateFilter,
		setAsOnDateFilter,
		dashboard,
		loading,
		filterValue,
		setFilterValue,
	};
};
export default useReceivablesDashboard;
