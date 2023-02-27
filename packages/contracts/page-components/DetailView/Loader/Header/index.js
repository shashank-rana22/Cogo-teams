import { Placeholder } from '@cogoport/components';

import Stats from './Stats';
import styles from './styles.module.css';

function Header() {
	return (
		<div>
			<div className={styles.heading}>
				<Placeholder styles={{ width: '50px', height: '50px' }} />
				<div><Placeholder styles={{ width: '50px', height: '50px' }} /></div>
			</div>
			<div className={styles.contract}>
				<Placeholder styles={{ width: '50px', height: '50px' }} />
			</div>
			<Stats />
		</div>
	);
}

export default Header;
