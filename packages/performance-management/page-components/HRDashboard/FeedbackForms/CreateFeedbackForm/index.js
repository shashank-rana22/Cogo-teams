import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import fetchLocalCheckList from '../../../../utils/fetchLocalCheckList';
import storeQuestionData from '../../../../utils/storeQuestionData';

import AddQuestions from './AddQuestions';
import SubmitForm from './SubmitForm';

function CreateFeedbackForm({
	formId = '', setFormId = () => {},
	setOpenCreateForm = () => {},
	formStage = '',
	setFormStage = () => {},
	setRefetchedLists,
	formsParams = {},
	setFormsParams = () => {},
}) {
	const { department = '', designation = '', bulkDesignations = [] } = formsParams;

	const [questionActionList, setQuestionActionList] = useState({});

	const proceedForm = (newStage) => {
		setFormStage(newStage);

		storeQuestionData({
			department,
			designation,
			bulkDesignations,
			checkList : ['', 'publish'].includes(newStage) ? [] : questionActionList.checked,
			stage     : ['', 'publish'].includes(newStage) ? undefined : newStage,
		});
	};

	useEffect(() => {
		const { checkList = [], stage = '' } = fetchLocalCheckList(department, designation);
		setQuestionActionList({ ...questionActionList, checked: checkList });
		setFormStage(stage || 'add_questions');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [designation]);

	const renderFormStage = () => {
		if (formStage === 'add_questions') {
			return (
				<AddQuestions
					formId={formId}
					questionActionList={questionActionList}
					setQuestionActionList={setQuestionActionList}
					proceedForm={proceedForm}
					formsParams={formsParams}
					setFormsParams={setFormsParams}
				/>
			);
		}

		if (formStage === 'submit_form') {
			if (isEmpty(questionActionList.checked)) {
				setFormStage('add_questions');
				return (
					<AddQuestions
						formId={formId}
						questionActionList={questionActionList}
						setQuestionActionList={setQuestionActionList}
						proceedForm={proceedForm}
						formsParams={formsParams}
						setFormsParams={setFormsParams}
					/>
				);
			}
			return (
				<SubmitForm
					questionActionList={questionActionList}
					setQuestionActionList={setQuestionActionList}
					proceedForm={proceedForm}
					formsParams={formsParams}
					setRefetchedLists={setRefetchedLists}
				/>
			);
		}
		setFormId('');
		setOpenCreateForm(false);

		return null;
	};

	return renderFormStage();
}

export default CreateFeedbackForm;
