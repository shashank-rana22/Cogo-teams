import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();
	const handleClick = () => {
		router.push('/ihls/data-pipeline');
	};
	return (
		<div className={styles.container}>
			<Button themeType="secondary" onClick={handleClick}>
				<IcMArrowBack className={styles.spacing} />

				<div>Go Back</div>
			</Button>

		</div>
	);
}

export default Header;
