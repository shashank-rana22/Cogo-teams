import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

const REDIRECT_URL = '/performance-management-configuration/config';

function Header() {
	const router = useRouter();

	const onClickConfiguration = () => {
		router.push(REDIRECT_URL, REDIRECT_URL);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Performance Management Configuration</div>

			<Button themeType="secondary" onClick={onClickConfiguration}>Configuration</Button>
		</div>
	);
}

export default Header;
