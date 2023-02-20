import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import fetchLocalCheckList from '../../../../utils/fetchLocalCheckList';
import storeQuestionData from '../../../../utils/storeQuestionData';

import AddQuestions from './AddQuestions';
import SubmitForm from './SubmitForm';

function CreateFeedbackForm({
	formId = '', setFormId = () => {}, department, designation,
	setOpenCreateForm = () => {},
	formStage = '',
	setFormStage = () => {},
}) {
	const [questionActionList, setQuestionActionList] = useState({});

	const proceedForm = (newStage) => {
		setFormStage(newStage);

		storeQuestionData({
			department,
			designation,
			checkList : newStage === 'cancel' ? [] : questionActionList.checked,
			weighList : newStage === 'cancel' ? [] : questionActionList.weigh,
			stage     : newStage === 'cancel' ? undefined : newStage,
		});
	};

	useEffect(() => {
		const { checkList = [], weighList = [], stage = '' } = fetchLocalCheckList(department, designation);
		setQuestionActionList({ ...questionActionList, checked: checkList, weigh: weighList });
		setFormStage(stage || 'add_questions');
	}, []);

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
				setFormStage('add_questions');
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
					questionActionList={questionActionList}
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

		setFormId('');
		setOpenCreateForm(false);

		return null;
	};

	return renderFormStage();
}

export default CreateFeedbackForm;
