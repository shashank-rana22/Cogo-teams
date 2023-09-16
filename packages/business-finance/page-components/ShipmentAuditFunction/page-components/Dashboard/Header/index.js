import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<Button themeType="secondary" size="md">Go Back</Button>

			<div className={styles.actions}>
				<Button size="md" themeType="secondary">Hold</Button>
				<Button size="md" themeType="primary">Approve</Button>
			</div>

		</div>
	);
}

export default Header;
