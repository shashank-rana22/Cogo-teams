import { Button } from '@cogoport/components';

import ConfigFilters from './ConfigFilters';
import styles from './styles.module.css';

function Header({
	params,
	setParams,
}) {
	return (
		<div className={styles.header_container}>
			<ConfigFilters params={params} setParams={setParams} />

			<Button size="md" themeType="accent">CREATE CONFIG</Button>
		</div>
	);
}

export default Header;
