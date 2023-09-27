import Body from './Body';
import Header from './Header';
import styles from './styles.module.css';

function RenderContent({
	formattedData = {},
	handleNotificationClick = () => {},
	onMarkAllAsRead = () => {},
	onSeeAll = () => {},
}) {
	const { list = [], loading = false } = formattedData || {};

	return (
		<div className={styles.container}>

			<Header
				formattedData={formattedData}
				onMarkAllAsRead={onMarkAllAsRead}
				onSeeAll={onSeeAll}
			/>

			<Body
				loading={loading}
				list={list}
				handleNotificationClick={handleNotificationClick}
			/>

		</div>
	);
}
export default RenderContent;
