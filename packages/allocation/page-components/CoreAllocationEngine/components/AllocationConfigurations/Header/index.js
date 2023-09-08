import { Legend, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getLegendItems from '../../../configurations/configurations-legend-items';

import ConfigFilters from './ConfigFilters';
import styles from './styles.module.css';

function Header(props) {
	const { t } = useTranslation(['allocation']);

	const {
		params,
		setParams,
		disabled,
		setShowCreateConfig,
	} = props;

	const legendItems = getLegendItems({ t });

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
					{t('allocation:create_button_label')}
				</Button>
			</div>
		</div>
	);
}

export default Header;
