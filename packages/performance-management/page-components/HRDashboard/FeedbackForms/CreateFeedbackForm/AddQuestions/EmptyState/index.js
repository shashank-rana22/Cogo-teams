import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function EmptyState({ setOpenNewQuestionModal = () => {} }) {
	return (
		<div className={styles.empty_state}>
			<div>No Questions available yet,. Kindly create new questions to use them in form...</div>

			<Button
				themeType="primary"
				onClick={() => setOpenNewQuestionModal(true)}
				style={{ marginTop: '8px' }}
			>
				Create Question

			</Button>
		</div>
	);
}

export default EmptyState;
