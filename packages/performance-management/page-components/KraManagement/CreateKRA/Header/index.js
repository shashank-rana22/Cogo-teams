import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.container}>
				<Button themeType="tertiary" onClick={() => router.back()}>
					<IcMArrowBack width={22} height={22} style={{ marginRight: 2 }} />
				</Button>
			</div>

			<div className={styles.header}>
				New KRA creation
			</div>
		</div>
	);
}

export default Header;
