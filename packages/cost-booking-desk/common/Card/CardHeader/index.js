import { Pill } from '@cogoport/components';
import { IcCCogoassured } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

export default function CardHeader({ item = {} }) {
	const { trade_type, source } = item || {};

	const displaySource = source === 'direct' ? 'Sell Without Buy' : startCase(source);

	const showChannelPartner = (item?.importer_exporter?.tags || []).includes('partner');

	return (
		<div className={styles.card_header}>
			{item.is_cogo_assured ? (
				<Pill
					color="green"
					className={styles.header_pills}
					prefix={<IcCCogoassured className={styles.assured_icon} />}
				>
					Cogoport Assured
				</Pill>
			) : null}

			<Pill
				color={trade_type === 'export' ? 'yellow' : 'blue'}
				className={styles.header_pills}
			>
				{startCase(trade_type)}
			</Pill>

			{showChannelPartner ? (
				<Pill color="orange" className={styles.header_pills}>Channel Partner</Pill>
			) : null}

			<Pill
				color="var(--color-secondary-3)"
				className={styles.header_pills}
			>
				{displaySource}
			</Pill>
		</div>
	);
}
