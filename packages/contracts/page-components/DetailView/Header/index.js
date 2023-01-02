import { IcMArrowBack } from '@cogoport/icons-react';

import Stats from './Stats';
import styles from './styles.module.css';

function Header({ setShowDetail, data }) {
	return (
		<div>
			<div className={styles.heading}>
				<IcMArrowBack
					style={{ cursor: 'pointer' }}
					onClick={() => { setShowDetail(null); }}
				/>
				<div className={styles.head}>Back to Contracts</div>
			</div>
			<div className={styles.contract}>
				Contract Details
			</div>
			<Stats data={data} />
		</div>
	);
}

export default Header;
