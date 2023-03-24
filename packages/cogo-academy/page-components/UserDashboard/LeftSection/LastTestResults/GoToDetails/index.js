import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function GoToDetails() {
	const { push } = useRouter();

	const handleGoToTestDetails = () => {
		push(
			'/learning/tests/dashboard/[test_id]',
			'/learning/tests/dashboard/c864325c-d27e-4d10-9045-d19f8a4f259a',
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
