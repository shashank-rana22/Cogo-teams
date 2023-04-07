import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function EmptyState({ setFormStage = () => {}, setOpenCreateForm = () => {} }) {
	return (
		<div className={styles.empty_state}>
			<div>No Forms available yet,. Kindly create new forms to use them for feedbacks...</div>

			<Button
				themeType="primary"
				onClick={() => {
					setFormStage('add_questions');
					setOpenCreateForm(true);
				}}
				style={{ marginTop: '8px' }}
			>
				Create Form
			</Button>
		</div>
	);
}

export default EmptyState;
