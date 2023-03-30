import { useState } from 'react';

import useUpdateCaseStudy from '../../hooks/useUpdateCaseStudy';
import useUpdateStandAloneTestQuestion from '../../hooks/useUpdateStandAloneTestQuestion';

const useSavedQuestionDetails = ({
	setAllKeysSaved,
	getTestQuestionTest,
	questionSetId,
	setEditDetails,
}) => {
	const [showModal, setShowModal] = useState({});

	const { updateStandAloneTestQuestion, loading } = useUpdateStandAloneTestQuestion();

	const {
		loading: caseStudyLoading,
		updateCaseStudy,
	} = useUpdateCaseStudy();

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
				getTestQuestionTest,
				questionSetId,
				setEditDetails,
				setAllKeysSaved,
			});
		} else {
			updateCaseStudy({
				id,
				action: 'delete',
				getTestQuestionTest,
				questionSetId,
				setEditDetails,
				setAllKeysSaved,
			});
		}
	};

	return {
		handleEditQuestion,
		handleDeleteQuestion,
		loading,
		showModal,
		setShowModal,
		caseStudyLoading,
	};
};

export default useSavedQuestionDetails;
