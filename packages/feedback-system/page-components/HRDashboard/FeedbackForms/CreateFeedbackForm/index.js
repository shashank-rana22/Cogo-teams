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
	setRefetchedLists,
}) {
	const [questionActionList, setQuestionActionList] = useState({});

	const proceedForm = (newStage) => {
		setFormStage(newStage);

		storeQuestionData({
			department,
			designation,
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
					department={department}
					designation={designation}
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
						department={department}
						designation={designation}
					/>
				);
			}
			return (
				<SubmitForm
					questionActionList={questionActionList}
					setQuestionActionList={setQuestionActionList}
					proceedForm={proceedForm}
					department={department}
					designation={designation}
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
