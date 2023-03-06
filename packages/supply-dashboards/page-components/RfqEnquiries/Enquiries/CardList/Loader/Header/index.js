import { Placeholder } from '@cogoport/components';
import { IcMFcl } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.heading}>
			<div className={styles.service}>
				<IcMFcl width={30} height={30} style={{ padding: '4px' }} />
				<Placeholder />
			</div>
			<div>
				<Placeholder />
			</div>
		</div>

	);
}
export default Header;
