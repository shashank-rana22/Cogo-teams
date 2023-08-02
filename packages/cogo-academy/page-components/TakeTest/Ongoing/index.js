/* eslint-disable react-hooks/exhaustive-deps */
// import { Toast } from '@cogoport/components';
import { useState, useEffect, useMemo } from 'react';

// import handleMinimizeTest from '../utils/handleMinimizeTest';

import LeftSection from './components/LeftSection';
import LeaveTest from './components/LeftSection/Footer/LeaveTest';
import EndTimer from './components/LeftSection/Header/Timer/EndTimer';
// import WarningModal from './components/LeftSection/WarningModal';
import { QuestionStatsContext } from './components/QuestionStatsContext';
import RightSection from './components/RightSection';
import SubmitTest from './components/RightSection/Footer/SubmitTest';
import InstructionsModal from './components/RightSection/InstructionsModal';
// import useEndTest from './hooks/useEndTest';
import useGetUserTestQuestion from './hooks/useGetUserTestQuestion';
import styles from './styles.module.css';

const INITIAL_VALUE = 1;
function Ongoing({ testData, setActiveState, currentQuestionId, test_user_mapping_state, page }) {
	const { guidelines = [] } = testData || {};

	const [currentQuestion, setCurrentQuestion] = useState(INITIAL_VALUE);
	const [subQuestion, setSubQuestion] = useState(INITIAL_VALUE);
	// const [isFullscreen, setIsFullscreen] = useState(false);
	const [showLeaveTestModal, setShowLeaveTestModal] = useState(false);
	const [showInstructionsModal, setShowInstructionsModal] = useState(false);
	const [showTimeOverModal, setShowTimeOverModal] = useState(false);
	const [showSubmitTestModal, setShowSubmitTestModal] = useState(false);

	const {
		getUserTestQuestion,
		loading,
		start_time,
		question_data = {},
		test_user_mapping_id,
		total_question_count,
		user_appearance = [],
	} = useGetUserTestQuestion({ currentQuestionId, test_user_mapping_state, page });

	// const { endTest, endTestLoading } = useEndTest({
	// 	setActiveState,
	// 	setShowTimeOverModal: setIsFullscreen,
	// 	test_user_mapping_id,
	// });

	// Watch for fullscreenchange
	// useEffect(() => {
	// 	function onFullscreenChange() {
	// 		setIsFullscreen(Boolean(document.fullscreenElement));
	// 	}

	// 	document.addEventListener('fullscreenchange', onFullscreenChange);

	// 	return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
	// }, []);

	// Watch for visibilitychange
	// useEffect(() => {
	// 	function onVisibilityChange() {
	// 		const visibilityChangeCount = localStorage.getItem('visibilityChangeCount');

	// 		localStorage.setItem('visibilityChangeCount', Number(visibilityChangeCount || 0) + 1);

	// 		if (['1', '3'].includes(visibilityChangeCount)) {
	// 			Toast.warn(visibilityChangeCount === '3'
	// 				? 'Warning: You test will be submitted if you switch tab/window again'
	// 				: 'Warning: Changing tab/window is not allowed during test');
	// 		}

	// 		if (visibilityChangeCount > 5) {
	// 			// endTest();
	// 			localStorage.setItem('visibilityChangeCount', 1);
	// 		}

	// 		// handleMinimizeTest();
	// 	}

	// 	document.addEventListener('visibilitychange', onVisibilityChange);

	// 	return () => document.removeEventListener('visibilitychange', onVisibilityChange);
	// }, [endTest]);

	useEffect(() => {
		if ((!(page && page !== 'undefined')
		|| (!(currentQuestionId && currentQuestionId !== 'undefined')
		&& page && page !== 'undefined' && page > INITIAL_VALUE))) {
			setCurrentQuestion(INITIAL_VALUE);
		} else {
			setCurrentQuestion(Number(page));
		}
	}, [currentQuestionId, page]);

	const questionProps = useMemo(() => ({
		total_question_count,
		user_appearance,
		setSubQuestion,
		data           : question_data,
		setCurrentQuestion,
		currentQuestion,
		fetchQuestions : getUserTestQuestion,
	}), [currentQuestion, getUserTestQuestion, question_data, total_question_count, user_appearance]);

	if (showTimeOverModal) {
		return (
			<EndTimer
				showTimeOverModal={showTimeOverModal}
				setShowTimeOverModal={setShowTimeOverModal}
				test_user_mapping_id={test_user_mapping_id}
				setActiveState={setActiveState}
				user_appearance={user_appearance}
				total_question_count={total_question_count}
			/>
		);
	}

	if (showLeaveTestModal) {
		return (
			<LeaveTest
				showLeaveTestModal={showLeaveTestModal}
				setShowLeaveTestModal={setShowLeaveTestModal}
				setActiveState={setActiveState}
				test_user_mapping_id={test_user_mapping_id}
				user_appearance={user_appearance}
				total_question_count={total_question_count}
				start_time={start_time}
				testData={testData}
				setShowTimeOverModal={setShowTimeOverModal}
			/>
		);
	}

	if (showSubmitTestModal) {
		return (
			<SubmitTest
				showSubmitTestModal={showSubmitTestModal}
				setShowSubmitTestModal={setShowSubmitTestModal}
				setActiveState={setActiveState}
				test_user_mapping_id={test_user_mapping_id}
				user_appearance={user_appearance}
				total_question_count={total_question_count}
				start_time={start_time}
				testData={testData}
				setShowTimeOverModal={setShowTimeOverModal}
			/>
		);
	}

	if (showInstructionsModal) {
		return (
			<InstructionsModal
				guidelines={guidelines}
				loading={loading}
				setShowInstructionsModal={setShowInstructionsModal}
				start_time={start_time}
				testData={testData}
				setShowTimeOverModal={setShowTimeOverModal}
			/>
		);
	}

	// if (!isFullscreen) {
	// 	return (
	// 		<WarningModal loading={loading || endTestLoading} />
	// 	);
	// }

	return (
		<div className={styles.main_container}>
			<QuestionStatsContext.Provider value={questionProps}>
				<div className={styles.left_container}>
					<LeftSection
						data={question_data}
						testData={testData}
						loading={loading}
						currentQuestion={currentQuestion}
						setCurrentQuestion={setCurrentQuestion}
						fetchQuestions={getUserTestQuestion}
						setShowLeaveTestModal={setShowLeaveTestModal}
						showTimeOverModal={showTimeOverModal}
						setShowTimeOverModal={setShowTimeOverModal}
						setActiveState={setActiveState}
						start_time={start_time}
						total_question_count={total_question_count}
						test_user_mapping_id={test_user_mapping_id}
						user_appearance={user_appearance}
						subQuestion={subQuestion}
						setSubQuestion={setSubQuestion}
						setShowSubmitTestModal={setShowSubmitTestModal}
						setShowInstructionsModal={setShowInstructionsModal}
					/>
				</div>
			</QuestionStatsContext.Provider>

			<QuestionStatsContext.Provider value={questionProps}>
				<div className={styles.right_container}>
					<RightSection
						setShowSubmitTestModal={setShowSubmitTestModal}
						setShowInstructionsModal={setShowInstructionsModal}
						setActiveState={setActiveState}
					/>
				</div>

			</QuestionStatsContext.Provider>
		</div>
	);
}

export default Ongoing;
