/* eslint-disable no-nested-ternary */
import { IcCCogoassured } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CardHeader({ data = {} }) {
	const tradeType = data.trade_type;

	return (
		<div className={styles.container}>
			{tradeType ? (
				tradeType === 'export' ? (
					<p className={(`${styles.trade_type} ${styles.yellow}`)}>
						{startCase(tradeType)}
					</p>
				)
					:				(
						<p className={(`${styles.trade_type} ${styles.blue}`)}>
							{startCase(tradeType)}
						</p>
					)

			) : null}

			{(data.importer_exporter.tags || []).includes('partner') ? (
				<p className={(`${styles.trade_type} ${styles.customer}`)}>Channel Partner</p>
			) : null}

			{data.is_cogo_assured && (
				<div className={styles.cogo_assured}>
					<div className={styles.icon_wrapper}>
						<IcCCogoassured />
					</div>

					<div className={styles.text}>Cogoport Assured</div>
				</div>
			)}

			{data.source ? (
				<p className={styles.source}>
					{data.source === 'direct'
						? 'Sell Without Buy'
						: startCase(data.source)}
				</p>
			) : null}
		</div>
	);
}

export default CardHeader;
