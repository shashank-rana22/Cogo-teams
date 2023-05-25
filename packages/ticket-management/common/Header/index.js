import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.heading}>My Tickets</div>
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
