import { cl, Pill } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { startCase, isEmpty } from '@cogoport/utils';

import checkIsEndToEnd from '../../../utils/checkIsEndToEnd';

import styles from './styles.module.css';

function Header({ data = {} }) {
	const { userData } = useSelector(({ profile }) => ({ userData: profile }));
	const { trade_type = '', importer_exporter = [], source } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				{!isEmpty(trade_type) ? (
					<Pill className={cl`${trade_type === 'export' ? styles.export : styles.import}
                     ${styles.trade_type} customize_trade_type`}
					>
						{startCase(trade_type)}
					</Pill>
				) : null}

				{importer_exporter?.tags?.includes('partner')
					? <Pill className={styles.channel_partner} color="orange">Channel Partner</Pill>
					: null}

				{checkIsEndToEnd({ booking_agents: data?.booking_agents, userData, trade_type })
					? <Pill className={styles.channel_partner} color="red">Nominated</Pill>
					: null}
			</div>

			<div>
				{source ? (
					<Pill className={cl`${styles.source} customize_source`}>
						{source === 'direct' ? 'Sell Without Buy' : startCase(source) }
					</Pill>
				) : null}
			</div>
		</div>
	);
}

export default Header;
