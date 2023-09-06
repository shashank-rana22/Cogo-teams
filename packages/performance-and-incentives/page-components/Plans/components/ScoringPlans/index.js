import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function ScoringPlans() {
	const router = useRouter();

	const handleClick = () => {
		router.push('/performance-and-incentives/plans/create-scoring-plan');
	};

	return (
		<div className={styles.container}>
			<h2>Scoring Plans</h2>

			<Button
				size="md"
				themeType="primary"
				onClick={handleClick}
			>
				Create Scoring

			</Button>

		</div>
	);
}

export default ScoringPlans;
