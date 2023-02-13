import { Button } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header() {
	return (
		<div>
			<div className={styles.flex_space_between}>
				<Button>Mark as Closed</Button>
			</div>
			<div className={styles.flex_space_between}>
				<div className={styles.flex}>
					<div>logo</div>
					<div>
						<div className={styles.name}>John Wick</div>
						<div className={styles.phone_number}>+91 9348630630</div>
					</div>
				</div>
				<div>
					hi
				</div>
			</div>
		</div>
	);
}
export default Header;
