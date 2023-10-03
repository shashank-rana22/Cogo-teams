import { cl } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import getLogConfig from '../../../../../../configuration/logsConfig';
import getValues from '../../../../../../utils/getValues';
import itemFunction from '../../../../../../utils/itemFunctions';
import EmptyState from '../../EmptyState';

import styles from './styles.module.css';

const LAST_INDEX = 1;

function Logs({ logs = [], currentTab = '' }) {
	const { t } = useTranslation(['saasSubscription']);

	const logConfig = getLogConfig({ t });

	if (isEmpty(logs)) {
		return (
			<EmptyState currentTab={currentTab} />
		);
	}

	return (
		<div className={styles.table}>
			<div className={cl`${styles.flex_box} ${styles.card_header}`}>
				{logConfig.map((config) => (
					<div key={config.key} className={styles[config.key]}>{startCase(config.label)}</div>
				))}
			</div>

			<div className={styles.scroll_container}>
				{(logs || []).map((ele, index) => (
					<div
						key={ele?.id}
						className={cl`${styles.flex_box}
                        ${logs.length - LAST_INDEX === index ? styles.no_border : ''}`}
					>

						{logConfig.map((config) => (
							<div key={config.key} className={styles[config.key]}>
								{getValues({ itemData: ele, config, itemFunction })}
							</div>
						))}

					</div>
				))}
			</div>
		</div>
	);
}

export default Logs;
