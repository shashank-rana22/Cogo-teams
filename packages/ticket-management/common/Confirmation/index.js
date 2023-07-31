import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Confirmation({ loading = false, handleChange = () => {} }) {
	return (
		<div className={styles.confirmation}>
			<div className={styles.confirmation_label}>
				Are you sure ?
			</div>
			<div className={styles.action}>
				<Button themeType="secondary" size="md" onClick={() => handleChange(false)}>
					No
				</Button>
				<Button className={styles.submit_button} size="md" type="submit" loading={loading}>
					Yes
				</Button>
			</div>
		</div>
	);
}

export default Confirmation;
