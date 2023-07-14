import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function NotEligible({ heading, sub_heading }) {
	const { push } = useRouter();

	const handleGoToDashboard = () => {
		push('/learning/tests/dashboard', '/learning/tests/dashboard', '_blank');
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{heading}
			</div>

			<div className={styles.sub_heading}>
				{sub_heading}
			</div>

			<div className={styles.button_container}>
				<Button themeType="accent" onClick={handleGoToDashboard}>Go To Dashboard</Button>
			</div>

		</div>
	);
}

export default NotEligible;
