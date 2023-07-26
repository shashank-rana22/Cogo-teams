import { Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

import Notification from '../Notification';

import Header from './Header';
import useNotificationHooks from './hooks/useNotificationHooks';
import styles from './styles.module.css';

function NotificationPage({
	onPageChange = () => {},
	formattedData = {},
	handleNotificationClick = () => {},
	onMarkAllAsRead = () => {},
}) {
	const {
		activeTab,
		loading,
		setPagination,
		formattedmailData,
		setActiveTabFunction,
	} = useNotificationHooks();

	return (
		<div>
			{!loading ? (
				<div className={styles.container}>
					<Tabs
						activeTab={activeTab}
						onChange={(tab) => setActiveTabFunction(tab)}
						className="horizontal two"
					>
						<TabPanel
							name="notifications"
							title="Notifications"
							className="horizontal one"
						>
							<Header
								onMarkAllAsRead={onMarkAllAsRead}
								formattedData={formattedData}
								onPageChange={onPageChange}
								activeTab={activeTab}
							/>
							{(formattedData?.list || []).map((item) => (
								<Notification
									key={item}
									className="small"
									item={item}
									handleNotificationClick={handleNotificationClick}
								/>
							))}
						</TabPanel>
						<TabPanel name="mails" title="Mails" className="horizontal one">
							<Header
								onMarkAllAsRead={onMarkAllAsRead}
								formattedData={formattedmailData}
								onPageChange={setPagination}
								activeTab={activeTab}
							/>
							{(formattedmailData?.list || []).map((item) => (
								<Notification
									key={item}
									className="small"
									item={item}
									handleNotificationClick={handleNotificationClick}
								/>
							))}
						</TabPanel>
					</Tabs>
				</div>
			) : null}
		</div>
	);
}

export default NotificationPage;
