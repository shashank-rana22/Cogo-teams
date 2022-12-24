import { IcCCogoassured } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.header_container}>
			<div className={styles.header_left_container}>
				<div className={styles.cogo_assured_container}>
					<div>
						<IcCCogoassured height={15} width={15} />
					</div>
					<div>Cogo Assured</div>
				</div>

				<div className={styles.trade_type_container}>
					{startCase('export')}
				</div>
				<div className={styles.importer_exporter_container}>
					Channel Partner
				</div>
			</div>
			<div>
				<div className={styles.source_container}>
					Sell Without Buy
				</div>
			</div>

		</div>
	);
}
export default Header;
