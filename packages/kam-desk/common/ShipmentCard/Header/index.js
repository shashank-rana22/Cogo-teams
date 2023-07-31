import { cl, Pill } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { startCase, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({ data = {} }) {
	const { userId } = useSelector(({ profile }) => ({ userId: profile?.user?.id }));
	const { trade_type = '', importer_exporter = [], source } = data || {};

	function checkIsEndToEnd(booking_agents) {
		const isExport = trade_type === 'export';
		const isImport = trade_type === 'import';

		return booking_agents.some((item) => {
			const isDestinationAgent = item?.stakeholder_type === 'destination_booking_agent';
			const isOriginAgent = item?.stakeholder_type === 'origin_booking_agent';

			if ((isDestinationAgent && isExport && userId === item?.id)
			|| (isOriginAgent && isImport && userId === item?.id)) {
				return true;
			}

			return false;
		});
	}

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

				{checkIsEndToEnd(data?.booking_agents)
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
