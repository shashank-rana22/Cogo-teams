import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function ShipmentAuditFunction() {
	const { push } = useRouter();

	const handleClick = () => {
		push(
			'/business-finance/coe-finance/next-page',
			'/business-finance/coe-finance/next-page',
		);
	};

	return (
		<main>
			<div className={styles.tabs_container}>
				<Button onClick={handleClick}>Go to Next Page</Button>
			</div>

		</main>
	);
}

export default ShipmentAuditFunction;
