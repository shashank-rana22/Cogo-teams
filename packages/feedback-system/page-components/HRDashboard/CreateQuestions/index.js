import { Button, Modal } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import CreateQuestionsForm from './CreateQuestionsForm';
import styles from './styles.module.css';

function CreateQuestions() {
	const [showQuestionModal, setShowQuestionModal] = useState(false);

	const showEditOption = false;
	return (
		<div>
			<Button
				size="md"
				themeType="accent"
				style={{ marginRight: '16px' }}
				onClick={() => setShowQuestionModal(true)}
			>
				<IcMPlus style={{ marginRight: '4px' }} />
				{showEditOption ? 'Edit Questions' : 'Create Questions'}
			</Button>

			<Modal
				show={showQuestionModal}
				onClose={() => setShowQuestionModal(false)}
				onOuterClick={() => setShowQuestionModal(false)}
				size="xl"
			>
				<Modal.Header title="Create Questions" />

				<div className={styles.modal_body}>
					<Modal.Body>
						<CreateQuestionsForm showEditOption={showEditOption} showQuestion={showQuestionModal} />
					</Modal.Body>
				</div>
			</Modal>
		</div>
	);
}

export default CreateQuestions;
