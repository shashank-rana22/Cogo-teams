import { Tabs, TabPanel, Placeholder, cl } from '@cogoport/components';
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
	loading = false,
	disabled = false,
	setDisabled = () => {},
}) {
	const {
		activeTab,
		setPagination,
		formattedmailData,
		setActiveTabFunction,
	} = useNotificationHooks();

	const DISABLED_STYLES = {
		cursor        : 'progress',
		pointerEvents : 'none',
	};

	return (
		<div>
			<div className={styles.container}>
				<Tabs
					activeTab={activeTab}
					onChange={(tab) => setActiveTabFunction(tab)}
					className={cl`${styles.tabs} ${disabled ? styles.disabled : ''}`}
					themeType="primary"
					style={disabled ? DISABLED_STYLES : {}}
					disabled={disabled}
				>
					<TabPanel
						name="notifications"
						title="Notifications"
						className={styles.tab_panel}
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
								item={item}
								handleNotificationClick={handleNotificationClick}
								setDisabled={setDisabled}
							/>
						)) : (
							[...Array(LOADER_COUNT).keys()].map((item) => (
								<Placeholder key={item} height="50px" width="100%" margin="0px 0px 20px 0px" />
							))
						)}
					</TabPanel>
					<TabPanel name="mails" title="Mails" className={styles.tab_panel}>
						<Header
							onMarkAllAsRead={onMarkAllAsRead}
							formattedData={formattedmailData}
							onPageChange={setPagination}
							activeTab={activeTab}
						/>
						{!loading ? (formattedmailData?.list || []).map((item) => (
							<Notification
								key={item}
								item={item}
								handleNotificationClick={handleNotificationClick}
								setDisabled={setDisabled}
							/>
						)) : (
							[...Array(LOADER_COUNT).keys()].map((item) => (
								<Placeholder key={item} height="50px" width="100%" margin="0px 0px 20px 0px" />
							))
						)}
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default NotificationPage;
