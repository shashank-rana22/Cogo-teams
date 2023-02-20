import { IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header() {
	return (
		<div>
			<div className={styles.header_container}>
				<div className={styles.back_arrow}>
					<IcMArrowBack width={20} height={20} />
				</div>

				<div className={styles.configuration_text}>
					Configuration Engine
				</div>

			</div>

		</div>
	);
}

export default Header;
