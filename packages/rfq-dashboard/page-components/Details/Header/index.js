import { IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.header_container}>
			<div className={styles.back_path_section}>
				<IcMArrowBack
					className={styles.back_icon}
					fill="#221F20"
				/>
				<div
					className={styles.heading}
				>
					Back to RFQ Dashboard
				</div>
			</div>
			<div className={styles.requested_date_section}>
				Requested on : 20 Mar 2023
			</div>
		</div>
	);
}
export default Header;
