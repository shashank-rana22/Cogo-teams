import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function GoToDetails({ test_id }) {
	const { push } = useRouter();

	const handleGoToTestDetails = () => {
		push(
			'/learning/tests/dashboard/[test_id]',
			`/learning/tests/dashboard/${test_id}`,
		);
	};

	return (
		<div className={styles.container}>
			<Button type="button" onClick={handleGoToTestDetails} size="md">
				Detailed Result
				<IcMArrowRight />
			</Button>
		</div>
	);
}

export default GoToDetails;
