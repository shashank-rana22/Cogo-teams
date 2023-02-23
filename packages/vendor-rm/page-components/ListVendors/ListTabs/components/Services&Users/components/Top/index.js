import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Top({ setShowForm = () => {} }) {
	return (
		<div className={styles.top}>
			Services & Users
			<div className={styles.btn}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setShowForm('serviceForm')}
				>
					Add Service
				</Button>

				<Button
					size="md"
					themeType="accent"
					onClick={() => setShowForm('pocForm')}
				>
					Add POC
				</Button>
			</div>
		</div>
	);
}

export default Top;
