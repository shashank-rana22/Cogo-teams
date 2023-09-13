import Body from './Body';
import Header from './Header';
import styles from './styles.module.css';

function RenderContent({
	formattedData = {},
	notificationType = 'general',
	setNotificationType = () => {},
	handleNotificationClick = () => {},
	onMarkAllAsRead = () => {},
	onSeeAll = () => {},
	// rpaNotifications = [],
	// rpaLoading = false,
	// handleRpaNotificationClick = () => {},
	setShowPopover = () => {},
}) {
	const { list = [], loading } = formattedData || {};

	const PILLS_MAPPING = [
		{
			color : 'red',
			label : 'Notifications',
			value : 'general',
		},
		// {
		// 	color : 'yellow',
		// 	label : 'Mails',
		// 	value : 'mails',
		// },
	];

	const NOTIFICATION_TYPE_MAPPING = {
		general: {
			loading,
			list,
			handleNotificationClick,
		},

		// mails: {
		// 	loading                 : rpaLoading,
		// 	list                    : rpaNotifications,
		// 	handleNotificationClick : handleRpaNotificationClick,
		// },
	};

	return (
		<div className={styles.container}>

			<Header
				setNotificationType={setNotificationType}
				formattedData={formattedData}
				onMarkAllAsRead={onMarkAllAsRead}
				onSeeAll={onSeeAll}
				setShow={setShowPopover}
				PILLS_MAPPING={PILLS_MAPPING}
			/>

			<Body
				{...NOTIFICATION_TYPE_MAPPING[notificationType]}
				setShowPopover={setShowPopover}
			/>

		</div>
	);
}
export default RenderContent;
