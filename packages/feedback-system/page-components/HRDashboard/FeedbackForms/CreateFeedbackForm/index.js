import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import fetchLocalCheckList from '../../../../utils/fetchLocalCheckList';
import storeQuestionData from '../../../../utils/storeQuestionData';

import AddQuestions from './AddQuestions';
import SubmitForm from './SubmitForm';

function CreateFeedbackForm({
	formId = '', setFormId = () => {}, department = 'a', work_scope = 'b',
	setOpenCreateForm = () => {},
}) {
	const [formStage, setFormStage] = useState('add_questions');
	const [questionActionList, setQuestionActionList] = useState({});

	const proceedForm = (stage) => {
		setFormStage(stage);
		storeQuestionData({ department, work_scope, checkList: stage === 'cancel' ? [] : questionActionList.checked });
	};

	useEffect(() => {
		setQuestionActionList({ ...questionActionList, checked: fetchLocalCheckList(department, work_scope) });
	}, [work_scope]);

	console.log('questionActionList', questionActionList);
	const renderFormStage = () => {
		if (formStage === 'add_questions') {
			return (
				<AddQuestions
					formId={formId}
					questionActionList={questionActionList}
					setQuestionActionList={setQuestionActionList}
					proceedForm={proceedForm}
				/>
			);
		}

		if (formStage === 'submit_form') {
			if (isEmpty(questionActionList.checked)) {
				Toast.error('Please select at least one question...');

				return (
					<AddQuestions
						formId={formId}
						questionActionList={questionActionList}
						setQuestionActionList={setQuestionActionList}
						proceedForm={proceedForm}
					/>
				);
			}
			return (
				<SubmitForm
					checkedList={questionActionList.checked}
					setQuestionActionList={setQuestionActionList}
					proceedForm={proceedForm}
				/>
			);
		}

		if (formStage === 'cancel') {
			setFormId('');
			setOpenCreateForm(false);
		}

		if (formStage === 'publish') {
			// onCreateFeedbackForm({ formQuestions: questionActionList.checked, department, work_scope });
			setFormId('');
			setOpenCreateForm(false);
		}

		return '';
	};

	return renderFormStage({ stage: formStage, setStage: setFormStage });
}

export default CreateFeedbackForm;
