import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.heading}>
			<div className={styles.port_pair}>

				<div>
					Shanghai (CNSHA)
				</div>
				<IcMPortArrow />
				<div>
					Mumbai(INNSA)
				</div>
			</div>
			<div className={styles.line} />
			<div>
				Request Price: $3,660/ctr.
			</div>
		</div>
	);
}

export default Header;
