import { cl } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ data = {} }) {
	console.log(data, 'data');
	return (
		<div className={cl`${styles.container} ${styles.flex_box}`}>
			<div className={styles.back_container}>
				<IcMArrowBack width={20} height={20} />
			</div>

			<div className={styles.flex_box} />

		</div>
	);
}

export default Header;
