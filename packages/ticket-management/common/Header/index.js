import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.heading}>Ticket Management</div>
			<Button
				size="md"
				themeType="primary"
			>
				Raise a ticket
			</Button>
		</div>
	);
}

export default Header;
