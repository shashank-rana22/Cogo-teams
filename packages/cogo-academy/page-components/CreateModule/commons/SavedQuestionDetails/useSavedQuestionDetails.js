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

	const { updateStandAloneTestQuestion, loading } = useUpdateStandAloneTestQuestion({
		questionSetId,
		getTestQuestionTest,
		setEditDetails,
		setAllKeysSaved,
	});

	const {
		loading: caseStudyLoading,
		updateCaseStudy,
	} = useUpdateCaseStudy({ setEditDetails, setAllKeysSaved, getTestQuestionTest, questionSetId });

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
		showModal,
		setShowModal,
		caseStudyLoading,
	};
};

export default useSavedQuestionDetails;
