import { Placeholder } from '@cogoport/components';

import { getPlanDetailsConfig } from '../../../configuration/planListConfig';
import getValues from '../../../utils/getValues';
import itemFunction from '../../Plan/ItemFunction';

import styles from './styles.module.css';

function Header({ plan = {}, loading = false }) {
	const planListConfig = getPlanDetailsConfig({ isPlanDetail: true });

	return (
		<div className={styles.flex_box}>
			{planListConfig.map((config) => (
				<div key={config.key} className={styles.col}>
					<p className={styles.title}>{config?.title}</p>
					<div className={styles.col_value}>
						{loading
							? <Placeholder /> : getValues({ itemData: plan, config, itemFunction })}
					</div>
				</div>
			))}
		</div>
	);
}

export default Header;
