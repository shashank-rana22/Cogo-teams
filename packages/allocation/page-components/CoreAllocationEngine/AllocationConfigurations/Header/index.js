import { Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<Button size="md" themeType="secondary">
				FILTER
				<IcMFilter style={{ marginLeft: '4px' }} />
				<div className={styles.filter_dot} />
			</Button>

			<Button size="md" themeType="accent">CREATE CONFIG</Button>
		</div>
	);
}

export default Header;
