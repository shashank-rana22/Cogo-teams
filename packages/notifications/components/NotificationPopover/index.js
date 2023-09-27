import RenderContent from './RenderContent';

function NotificationsPopover(props) {
	const {
		formattedData = {},
		onMarkAllAsRead = () => {},
		onSeeAll = () => {},
		handleNotificationClick = () => {},
	} = props || {};

	return (
		<div style={{ display: 'flex' }}>
			<RenderContent
				formattedData={formattedData}
				onMarkAllAsRead={onMarkAllAsRead}
				onSeeAll={onSeeAll}
				handleNotificationClick={handleNotificationClick}
			/>
		</div>
	);
}

export default NotificationsPopover;
