import { Avatar } from '@cogoport/components';

import styles from './styles.module.css';

function RightSideNav() {
	return (
		<div className={styles.right_container}>
			<Avatar
				src="https://www.w3schools.com/howto/img_avatar.png"
				alt="img"
				disabled={false}
				size="48px"
			/>
		</div>
	);
}
export default RightSideNav;
