import { useState } from 'react';

import useUpdateCaseStudy from '../../hooks/useUpdateCaseStudy';
import useUpdateStandAloneTestQuestion from '../../hooks/useUpdateStandAloneTestQuestion';

const useSavedQuestionDetails = ({
	setAllKeysSaved,
	getTestQuestionTest,
	questionSetId,
	setEditDetails,
	listSetQuestions,
	editDetails,
	setQuestionDetails,
}) => {
	const [questionToDelete, setQuestionToDelete] = useState({});

	const { updateStandAloneTestQuestion, loading } = useUpdateStandAloneTestQuestion({
		questionSetId,
		getTestQuestionTest,
		setEditDetails,
		setAllKeysSaved,
		setQuestionToDelete,
		listSetQuestions,
		editDetails,
		setQuestionDetails,
	});

	const {
		loading: caseStudyLoading,
		updateCaseStudy,
	} = useUpdateCaseStudy({
		setEditDetails,
		setAllKeysSaved,
		getTestQuestionTest,
		questionSetId,
		setQuestionToDelete,
		listSetQuestions,
		setQuestionDetails,
	});

	const handleEditQuestion = ({ item }) => {
		setAllKeysSaved(false);
		setEditDetails(item);
		setQuestionDetails({});

		const element = document.getElementById('question_form');

		element.scrollIntoView({
			behavior : 'smooth',
			inline   : 'center',
			block    : 'center',
		});
	};

	const handleDeleteQuestion = ({ item }) => {
		const { question_type, id } = item || {};

		if (question_type !== 'case_study') {
			updateStandAloneTestQuestion({
				testQuestionId : id,
				action         : 'delete',
			});
		} else {
			updateCaseStudy({
				id,
				action: 'delete',
			});
		}
	};

	return {
		handleEditQuestion,
		handleDeleteQuestion,
		loading,
		questionToDelete,
		setQuestionToDelete,
		caseStudyLoading,
	};
};

export default useSavedQuestionDetails;
