import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetDashboardSummary from '../../hooks/useGetDashboardSummary';
import useListAllFeed from '../../hooks/useListAllFeed';
import MyPayslips from '../MyPayslips';

import Header from './Header';
import MainSection from './MainSection';
import styles from './styles.module.css';

function HrmsEmployeeDashboard() {
	const router = useRouter();

	const [isEmployeeDashboardActive, setIsEmployeeDashboardActive] = useState(true);

	const { data, refetch, setFilters, loading : feedLoading } = useListAllFeed();
	const { data: summaryData, loading } = useGetDashboardSummary(isEmployeeDashboardActive);

	const handleBack = () => {
		router.push('/welcome');
	};

	if (router.query?.is_payslip === 'payslip') {
		return (
			<div className={styles.container}>
				<Header summaryData={summaryData} />
				<MyPayslips handleBack={handleBack} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Header summaryData={summaryData} />
			<MainSection
				data={data}
				summaryData={summaryData}
				loading={loading}
				feedRefetch={refetch}
				setFilters={setFilters}
				isEmployeeDashboardActive={isEmployeeDashboardActive}
				setIsEmployeeDashboardActive={setIsEmployeeDashboardActive}
				feedLoading={feedLoading}
			/>
		</div>
	);
}

export default HrmsEmployeeDashboard;
