import { Placeholder, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function PlanFeature({ title, list = [], configs, loading = false }) {
	return (
		<div className={styles.container}>
			<div className={styles.flex_box}>
				<h3>{title}</h3>
			</div>
			<div>
				<div className={cl`${styles.card_header} ${styles.flex_box}`}>
					{configs.map((config) => (
						<div key={config.key} className={styles.col} style={{ width: config.width }}>
							{config?.title}
						</div>
					))}
				</div>
				{(list || [])?.map((feature) => (
					<div key={feature?.display_name} className={cl`${styles.flex_box} ${styles.item_row}`}>
						{configs.map((config) => (
							<div key={config.key} className={styles.col} style={{ width: config.width }}>
								{loading ? <Placeholder /> : startCase(feature?.[config?.key])}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default PlanFeature;
