import { IcMArrowBack, IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.back}>
				<IcMArrowBack height={24} width={24} />
			</div>

			<div className={styles.location_info}>
				<div>
					<div>Jawaharlal Nehru (INNSA), India</div>
				</div>
				<div>
					<IcMPortArrow />
				</div>
				<div>
					<div>Jebel Ali (INNSA), Dubai</div>
				</div>
			</div>

			<div className={styles.port_pair_count}>
				<div>Port Pair Count</div>
				<div>-</div>
			</div>
			<div className={styles.forecasted_demand}>
				<div>Forecasted Demand</div>
				<div>500 TEUs</div>
			</div>
		</div>
	);
}

export default Header;
