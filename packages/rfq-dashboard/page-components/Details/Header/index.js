import { Placeholder } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ loading }) {
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

			{
				loading ? (
					<Placeholder
						width="200px"
						height="20px"
						className={styles.text_placeholder}
					/>
				) : (
					<div className={styles.requested_date_section}>
						Requested on : 20 Mar 2023
					</div>
				)
			}

		</div>
	);
}
export default Header;
