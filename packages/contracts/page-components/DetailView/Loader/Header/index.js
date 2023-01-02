import { Placeholder } from '@cogoport/components';

import Stats from './Stats';
import styles from './styles.module.css';

function Header() {
	return (
		<div>
			<div className={styles.heading}>
				<Placeholder />
				<div><Placeholder /></div>
			</div>
			<div className={styles.contract}>
				<Placeholder />
			</div>
			<Stats />
		</div>
	);
}

export default Header;
