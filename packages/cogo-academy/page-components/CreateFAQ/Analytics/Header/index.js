import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header({ setSwitchDashboard = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>FAQs Analytics Dashboard</div>

			<div className={styles.button_container}>
				<Button type="button" themeType="primary" onClick={() => setSwitchDashboard(true)}>
					Creator Management Dashboard
				</Button>
			</div>
		</div>
	);
}

export default Header;
