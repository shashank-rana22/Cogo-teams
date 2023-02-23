import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Top({
	setShowForm = () => {},
	showForm,
}) {
	return (
		<div className={styles.top}>
			Services & Users

			<div className={styles.btn}>
				<Button
					size="md"
					themeType="secondary"
					role="presentation"
					onClick={() => (showForm === 'serviceForm' ? setShowForm('') : setShowForm('serviceForm'))}
				>
					Add Service
				</Button>

				<Button
					size="md"
					themeType="accent"
					role="presentation"
					onClick={() => (showForm === 'pocForm' ? setShowForm('') : setShowForm('pocForm'))}
				>
					Add POC
				</Button>
			</div>
		</div>
	);
}

export default Top;
