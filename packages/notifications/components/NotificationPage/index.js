import { Tabs, TabPanel, Placeholder, cl } from '@cogoport/components';
// import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
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
	const { t } = useTranslation(['notifications']);

	const {
		activeTab,
		setPagination,
		formattedmailData,
		setActiveTabFunction,
	} = useNotificationHooks();

	const DISABLED_STYLES = {
		pointerEvents : 'none',
		cursor        : 'progress',
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
				>
					<TabPanel
						name="notifications"
						title={t('notifications:tab_notifications_label')}
						className={styles.tab_panel}
					>
						<Header
							onMarkAllAsRead={onMarkAllAsRead}
							formattedData={formattedData}
							onPageChange={onPageChange}
							activeTab={activeTab}
							disabled={disabled}
						/>

						{/* {loading
							? ([...Array(LOADER_COUNT).keys()].map((item) => (
								<Placeholder key={item} height="50px" width="100%" margin="0px 0px 20px 0px" />
							)))
							: null}

						{!loading && !isEmpty(formattedData?.list)
							? (
								formattedData?.list || []).map((item) => (
									<Notification
										key={item?.id}
										item={item}
										handleNotificationClick={handleNotificationClick}
										disabled={disabled}
										setDisabled={setDisabled}
									/>
							))
							: null} */}

						{!loading
							? (formattedData?.list || []).map((item) => (
								<Notification
									key={item?.id}
									item={item}
									handleNotificationClick={handleNotificationClick}
									disabled={disabled}
									setDisabled={setDisabled}
								/>
							))
							: (
								[...Array(LOADER_COUNT).keys()].map((item) => (
									<Placeholder key={item} height="50px" width="100%" margin="0px 0px 20px 0px" />
								))
							)}

					</TabPanel>
					<TabPanel
						name="mails"
						title={t('notifications:tab_mails_label')}
						className={styles.tab_panel}
					>
						<Header
							onMarkAllAsRead={onMarkAllAsRead}
							formattedData={formattedmailData}
							onPageChange={setPagination}
							activeTab={activeTab}
							disabled={disabled}
						/>
						{!loading
							? (formattedmailData?.list || []).map((item) => (
								<Notification
									key={item?.id}
									item={item}
									handleNotificationClick={handleNotificationClick}
									disabled={disabled}
									setDisabled={setDisabled}
								/>
							))
							: (
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
