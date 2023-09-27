import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Header(props) {
	const {
		formattedData = {},
		onMarkAllAsRead = () => {},
		onSeeAll = () => {},
	} = props || {};

	return (
		<div className={styles.header_container}>

			<h3 className={styles.header}>Notifications</h3>

			{!isEmpty(formattedData?.list || []) ? (
				<div className={styles.row}>
					<div
						onClick={onMarkAllAsRead}
						role="presentation"
						className={styles.mark_read}
					>
						Mark all as read
					</div>

					<Button
						size="sm"
						themeType="primary"
						onClick={onSeeAll}
					>
						SEE All
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default Header;
