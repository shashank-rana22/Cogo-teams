import { Button } from '@cogoport/components';

import ConfigFilters from './ConfigFilters';
import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.header_container}>
			<ConfigFilters />

			<Button size="md" themeType="accent">CREATE CONFIG</Button>
		</div>
	);
}

export default Header;
