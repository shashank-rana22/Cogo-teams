import { Legend, Button } from '@cogoport/components';

import legendItems from '../../../configurations/configurations-legend-items';

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
			<Legend
				className={styles.legends}
				direction="horizontal"
				size="md"
				items={legendItems}
			/>

			<div className={styles.right_container}>
				<ConfigFilters params={params} setParams={setParams} disabled={disabled} />

				<Button
					size="md"
					themeType="primary"
					onClick={() => setShowCreateConfig(true)}
					disabled={disabled}
				>
					Create
				</Button>
			</div>
		</div>
	);
}

export default Header;
