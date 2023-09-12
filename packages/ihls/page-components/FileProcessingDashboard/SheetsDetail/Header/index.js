import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<Button themeType="secondary">
				<IcMArrowBack className={styles.spacing} />

				<div>Go Back</div>
			</Button>

		</div>
	);
}

export default Header;
