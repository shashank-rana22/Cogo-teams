import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	return (
		<button className={styles.back_button} onClick={() => router.back()}>
			<IcMArrowBack width="32px" height="20px" />
			CRM Feedback Dashboard
		</button>

	);
}

export default Header;
