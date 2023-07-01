import { cl, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({ item = {} }) {
	const { trade_type = '', importer_exporter = {}, source = '' } = item || {};

	return (
		<div className={styles.container}>
			<div className={styles.trade_type_container}>
				{trade_type ? (
					<Pill className={cl`${trade_type === 'export' ? styles.export : styles.import}
                     ${styles.trade_type}`}
					>
						{startCase(trade_type)}
					</Pill>
				) : null}

				{importer_exporter?.tags?.includes('partner')
					? <Pill color="orange">Channel Partner</Pill>
					: null}
			</div>

			<div className={styles.source_container}>
				{source ? (
					<Pill className={styles.source}>
						{source === 'direct' ? 'Sell Without Buy' : startCase(source) }
					</Pill>
				) : null}
			</div>
		</div>
	);
}
export default Header;
