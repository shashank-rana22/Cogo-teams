import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Confirmation({ loading = false, handleChange = () => {}, t = () => {} }) {
	return (
		<div className={styles.confirmation}>
			<div className={styles.confirmation_label}>
				{t('myTickets:are_you_sure')}
			</div>
			<div className={styles.action}>
				<Button themeType="secondary" size="md" onClick={() => handleChange(false)}>
					{t('myTickets:no_label')}
				</Button>
				<Button className={styles.submit_button} size="md" type="submit" loading={loading}>
					{t('myTickets:yes_label')}
				</Button>
			</div>
		</div>
	);
}

export default Confirmation;
