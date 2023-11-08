import { Tabs, TabPanel, Button, Breadcrumb } from '@cogoport/components';
import { IcMPlus, IcMTaskCompleted } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import AddNewExpense from '../AddExpense';

import styles from './styles.module.css';
import tabs from './useGetTabs';

function PayrollDashboard() {
	const router = useRouter();
	const [tab, setTab] = useState('expensemanagement');
	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
	};

	useEffect(() => {
		if (router.query.tab) {
			setTab(router.query.tab);
		}
	}, [router.query.tab]);

	const handleSetTab = (clickedTab) => {
		setTab(clickedTab);
	};

	return (
		<div className={styles.main}>
			<Breadcrumb className={styles.bread}>
				<Breadcrumb.Item label={(
					<div
						aria-hidden
						style={{ cursor: 'pointer' }}
						onClick={() => router.push('/hrms')}
					>
						HRMS
					</div>
				)}
				/>
				<Breadcrumb.Item label="Expense Management" />
			</Breadcrumb>
			<div className={styles.head_flex}>
				<span className={styles.heading}>Payments</span>
				<div className={styles.buttons}>
					<Button size="md" themeType="secondary" onClick={() => setShow(true)}>
						<div className={styles.button_text_container}>
							<span className={styles.button_text}>New request</span>
							<IcMPlus width={18} height={18} />
						</div>
					</Button>
					<Button
						size="md"
						themeType="primary"
						onClick={() => router.push('/attendance-leave-management?showInbox=true')}
					>
						<div className={styles.button_text_container}>
							<span className={styles.button_text}>My Inbox</span>
							<IcMTaskCompleted width={18} height={18} />
						</div>
					</Button>
				</div>
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
			<AddNewExpense show={show} onClose={handleClose} />
		</div>
	);
}

export default PayrollDashboard;
