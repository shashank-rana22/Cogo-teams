import { Button } from '@cogoport/components';

import Questions from '../../Questions';

function SubmitForm({
	checkedList = [],
	setQuestionActionList = () => [],
	proceedForm = () => {},
}) {
	return (
		<div>
			<div>Create Form</div>
			{checkedList.length > 0 && (
				<Questions
					questions={checkedList}
					setQuestionActionList={setQuestionActionList}
					questionStatus="checked"
				/>
			)}

			<div>
				<Button themeType="tertiary" onClick={() => proceedForm('add_questions')}>Back</Button>
				<Button themeType="accent" onClick={() => proceedForm('publish')}>Submit</Button>
			</div>
		</div>
	);
}

export default SubmitForm;
