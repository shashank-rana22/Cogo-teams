import { IcMArrowBack } from '@cogoport/icons-react';

import Stats from './Stats';
import styles from './styles.module.css';

function Header({ setShowDetail }) {
	return (
		<div>
			<div className={styles.heading}>
				<IcMArrowBack
					style={{ cursor: 'pointer' }}
					onClick={() => { setShowDetail(null); }}
				/>
				<div>Back to Pending Jobs</div>
			</div>
			<div className={styles.contract}>
				Contract Details
			</div>
			<Stats />
		</div>
	);
}

export default Header;
