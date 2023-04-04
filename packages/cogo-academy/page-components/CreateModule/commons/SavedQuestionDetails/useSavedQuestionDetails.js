import { useState } from 'react';

import useUpdateCaseStudy from '../../hooks/useUpdateCaseStudy';
import useUpdateStandAloneTestQuestion from '../../hooks/useUpdateStandAloneTestQuestion';

const useSavedQuestionDetails = ({
	setAllKeysSaved,
	getTestQuestionTest,
	questionSetId,
	setEditDetails,
	listSetQuestions,
}) => {
	const [questionToDelete, setQuestionToDelete] = useState({});

	const { updateStandAloneTestQuestion, loading } = useUpdateStandAloneTestQuestion({
		questionSetId,
		getTestQuestionTest,
		setEditDetails,
		setAllKeysSaved,
		setQuestionToDelete,
		listSetQuestions,
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
	});

	const handleEditQuestion = ({ item }) => {
		setAllKeysSaved(false);
		setEditDetails(item);
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
