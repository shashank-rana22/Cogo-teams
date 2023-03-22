import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function GoToDetails() {
	const { push } = useRouter();

	const handleGoToTestDetails = () => {
		push(
			'/learning/tests/dashboard/[test_id]',
			'/learning/tests/dashboard/2b605b28-3cc1-47a7-b73e-52b8a2cb9f76',
		);
	};

	return (
		<div className={styles.container}>
			<Button onClick={handleGoToTestDetails} size="md">
				Detailed Result
				<IcMArrowRight />
			</Button>
		</div>
	);
}

export default GoToDetails;
