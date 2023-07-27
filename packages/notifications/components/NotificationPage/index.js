import { Tabs, TabPanel, Placeholder } from '@cogoport/components';
import React from 'react';

import Notification from '../Notification';

import Header from './Header';
import useNotificationHooks from './hooks/useNotificationHooks';
import styles from './styles.module.css';

const LOADER_COUNT = 5;

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
						themeType="primary"
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
							{!loading ? (formattedData?.list || []).map((item) => (
								<Notification
									key={item}
									className="small"
									item={item}
									handleNotificationClick={handleNotificationClick}
								/>
							)) : (
								[...Array(LOADER_COUNT).keys()].map((item) => (
									<Placeholder key={item} height="50px" width="100%" margin="0px 0px 20px 0px" />
								))
							)}
						</TabPanel>
						<TabPanel name="mails" title="Mails" className="horizontal one">
							<Header
								onMarkAllAsRead={onMarkAllAsRead}
								formattedData={formattedmailData}
								onPageChange={setPagination}
								activeTab={activeTab}
							/>
							{!loading ? (formattedmailData?.list || []).map((item) => (
								<Notification
									key={item}
									className="small"
									item={item}
									handleNotificationClick={handleNotificationClick}
								/>
							)) : (
								[...Array(LOADER_COUNT).keys()].map((item) => (
									<Placeholder key={item} height="50px" width="100%" margin="0px 0px 20px 0px" />
								))
							)}
						</TabPanel>
					</Tabs>
				</div>
			) : null}
		</div>
	);
}

export default NotificationPage;
