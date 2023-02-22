import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Top({ setShowForm = () => {}, showForm }) {
	return (
		<div className={styles.top}>
			Services & Users
			<div className={styles.btn}>
				<Button size="md" themeType="secondary" onClick={() => { setShowForm(!showForm); }}>Add Service</Button>

				<Button size="md" themeType="accent">Add POC</Button>
			</div>
		</div>
	);
}

export default Top;
