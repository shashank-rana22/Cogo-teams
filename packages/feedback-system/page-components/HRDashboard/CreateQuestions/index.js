import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import CreateQuestionsForm from './CreateQuestionsForm';

function CreateQuestions() {
	const [showCreateQForm, setShowCreateQForm] = useState(false);

	const showEditOption = false;
	return (
		<div>
			<Button
				className="primary md"
				style={{ marginRight: '16px' }}
				onClick={() => setShowCreateQForm(true)}
			>
				{showEditOption ? 'Edit Questions' : 'Create Questions'}
			</Button>

			<Modal
				show={showCreateQForm}
				onClose={() => setShowCreateQForm(false)}
				onOuterClick={() => setShowCreateQForm(false)}
				size="xl"
			>
				<CreateQuestionsForm showEditOption={showEditOption} />
			</Modal>
		</div>
	);
}

export default CreateQuestions;
