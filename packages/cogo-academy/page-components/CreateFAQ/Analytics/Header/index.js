import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>FAQs Dashboard</div>

			<div className={styles.button_container}>
				<Button themeType="primary">
					Creator Management Dashboard
				</Button>

			</div>
		</div>
	);
}

export default Header;
