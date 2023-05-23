import { Button, Placeholder, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getValue = ({ feature, config }) => {
	if (feature?.[config?.key]) return startCase(feature?.[config?.key]);
	return '--';
};

function PlanFeature({ title, list = [], configs, loading = false, setFeatureModal }) {
	const updateList = loading ? [1, 2, 3, 4] : list;
	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.header_container}`}>
				<h3>{title}</h3>
				<Button
					type="button"
					themeType="secondary"
					onClick={() => setFeatureModal({ openModal: true })}
				>
					Add More
				</Button>
			</div>

			<div>
				<div className={cl`${styles.card_header} ${styles.flex_box}`}>
					{configs.map((config) => (
						<div key={config.key} className={styles.col} style={{ width: config.width }}>
							{config?.title}
						</div>
					))}
				</div>
				{(updateList || [])?.map((feature) => (
					<div key={feature?.display_name} className={cl`${styles.flex_box} ${styles.item_row}`}>
						{configs.map((config) => (
							<div key={config.key} className={styles.col} style={{ width: config.width }}>
								{loading ? <Placeholder /> : getValue({ feature, config })}
							</div>
						))}
					</div>
				))}

			</div>
		</div>
	);
}

export default PlanFeature;
