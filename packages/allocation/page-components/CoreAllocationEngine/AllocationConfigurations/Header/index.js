import { Button } from '@cogoport/components';

import ConfigFilters from './ConfigFilters';
import styles from './styles.module.css';

function Header(props) {
	const {
		params,
		setParams,
		disabled,
		setShowCreateConfig,
	} = props;

	return (
		<div className={styles.header_container}>
			<ConfigFilters params={params} setParams={setParams} disabled={disabled} />

			<Button
				size="md"
				themeType="accent"
				onClick={() => setShowCreateConfig(true)}
			>
				CREATE CONFIG

			</Button>
		</div>
	);
}

export default Header;
