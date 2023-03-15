import { ProgressBar } from '@cogoport/components';

import styles from './styles.module.css';
import Timer from './Timer';

function Header() {
	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>Shipment and Enrichment Test</div>
			<div className={styles.progress}>
				<ProgressBar progress={20} uploadText=" " />
				1/25 questions
			</div>
			<Timer />
		</div>

	);
}

export default Header;
