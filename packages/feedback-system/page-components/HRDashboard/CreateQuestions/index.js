import { Button, Modal } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import CreateQuestionsForm from './CreateQuestionsForm';

function CreateQuestions() {
	const [showCreateQForm, setShowCreateQForm] = useState(false);

	const showEditOption = false;
	return (
		<div>
			<Button
				size="md"
				style={{ marginRight: '16px', backgroundColor: '#abb0de' }}
				onClick={() => setShowCreateQForm(true)}
			>
				<IcMPlus style={{ marginRight: '4px' }} />
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
