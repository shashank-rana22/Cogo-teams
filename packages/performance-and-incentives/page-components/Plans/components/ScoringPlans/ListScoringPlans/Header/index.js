import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Header() {
	const { push } = useRouter();

	return (
		<div className={styles.header}>
			<h2 className={styles.heading}>Scoring Plans</h2>

			<Button
				size="lg"
				themeType="primary"
				type="button"
				onClick={() => push('/performance-and-incentives/plans?mode=create')}
			>
				Create Scoring
			</Button>
		</div>
	);
}

export default Header;
