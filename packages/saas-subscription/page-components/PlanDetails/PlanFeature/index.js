import { Button, Placeholder, cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getValues from '../../../utils/getValues';
import itemFunctions from '../../../utils/itemFunctions';

import styles from './styles.module.css';

const LOADER_COUNT = 4;

function PlanFeature({ title, list = [], configs, loading = false, setFeatureModal, name }) {
	const { t } = useTranslation(['saasSubscription']);

	const updateList = loading ? [...Array(LOADER_COUNT).keys()] : list;

	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.header_container}`}>
				<h3>{title}</h3>
				<Button
					type="button"
					themeType="secondary"
					onClick={() => setFeatureModal((prev) => ({ ...prev, name, openModal: true, info: list }))}
				>
					{t('saasSubscription:pricing_add')}
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
								{loading ? <Placeholder /> : getValues({ itemData: feature, config, itemFunctions })}
							</div>
						))}
					</div>
				))}

			</div>
		</div>
	);
}

export default PlanFeature;
