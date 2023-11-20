import { Tabs, TabPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import MyPayslips from '../MyPayslips';

import styles from './styles.module.css';
import tabs from './useGetTabs';

function PayrollDashboard() {
	const router = useRouter();
	const [tab, setTab] = useState('dashboard');

	useEffect(() => {
		if (router.query.tab) {
			setTab(router.query.tab);
		}
	}, [router.query.tab]);

	const handleSetTab = (clickedTab) => {
		setTab(clickedTab);

		if (clickedTab === 'dashboard') {
			router.push('/payroll');
		} else {
			router.push(`/payroll/${clickedTab}`);
		}
	};
	if (router.query?.is_payslip === 'payslip') {
		return <MyPayslips />;
	}

	return (
		<div className={styles.main}>
			<div className={styles.top_text} />
			<div className={styles.head_flex}>
				<span className={styles.heading}>Cogo Payroll (Admin)</span>
			</div>

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={tab}
					themeType="secondary"
					onChange={handleSetTab}
				>
					{
						tabs.map(({ name, title, Component }) => (
							<TabPanel name={name} title={title} key={name}>
								{Component}
							</TabPanel>
						))
					}

				</Tabs>
			</div>
		</div>
	);
}

export default PayrollDashboard;
