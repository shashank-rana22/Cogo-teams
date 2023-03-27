import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState, useEffect } from 'react';

import LeftSection from './components/LeftSection';
import LeaveTest from './components/LeftSection/Footer/LeaveTest';
import EndTimer from './components/LeftSection/Header/Timer/EndTimer';
import WarningModal from './components/LeftSection/WarningModal';
import RightSection from './components/RightSection';
import SubmitTest from './components/RightSection/Footer/SubmitTest';
import InstructionsModal from './components/RightSection/InstructionsModal';
import useFetchQuestionsList from './hooks/useFetchQuestionList';
import styles from './styles.module.css';

function Ongoing({ testData, page, setActiveState }) {
	const router = useRouter();

	const { guidelines = [] } = testData || {};

	const [currentQuestion, setCurrentQuestion] = useState(page || 1);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [showLeaveTestModal, setShowLeaveTestModal] = useState(false);
	const [showInstructionsModal, setShowInstructionsModal] = useState(false);
	const [showTimeOverModal, setShowTimeOverModal] = useState(false);
	const [showSubmitTestModal, setShowSubmitTestModal] = useState(false);

	const { loading, data, fetchQuestions } = useFetchQuestionsList({ currentQuestion });

	// Watch for fullscreenchange
	useEffect(() => {
		function onFullscreenChange() {
			setIsFullscreen(Boolean(document.fullscreenElement));
		}

		document.addEventListener('fullscreenchange', onFullscreenChange);

		return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
	}, []);

	// Watch for visibilitychange
	useEffect(() => {
		function onVisibilityChange() {
			const visibilityChangeCount = localStorage.getItem('visibilityChangeCount');

			localStorage.setItem('visibilityChangeCount', Number(visibilityChangeCount || 0) + 1);

			if (['1', '3'].includes(visibilityChangeCount)) {
				Toast.warn(visibilityChangeCount === '3'
					? 'Warning: You will be redirected to dashboard if you switch tab/window again'
					: 'Warning: Changing tab/window is not allowed during test');
			}

			if (visibilityChangeCount > 5) {
				router.push('/learning/tests/dashboard');
				localStorage.setItem('visibilityChangeCount', 1);
				return;
			}

			if (document.fullscreenElement) {
				if (document?.exitFullscreen) {
					document?.exitFullscreen();
				} else if (document?.webkitExitFullscreen) { /* Safari */
					document?.webkitExitFullscreen();
				} else if (document?.msExitFullscreen) { /* IE11 */
					document?.msExitFullscreen();
				}
			}
		}

		document.addEventListener('visibilitychange', onVisibilityChange);

		return () => document.removeEventListener('visibilitychange', onVisibilityChange);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (showLeaveTestModal) {
		return (
			<LeaveTest
				showLeaveTestModal={showLeaveTestModal}
				setShowLeaveTestModal={setShowLeaveTestModal}
				setActiveState={setActiveState}
				data={data}
			/>
		);
	}

	if (showTimeOverModal) {
		return (
			<EndTimer
				showTimeOverModal={showTimeOverModal}
				setShowTimeOverModal={setShowTimeOverModal}
				data={data}
				setActiveState={setActiveState}
			/>
		);
	}

	if (showSubmitTestModal) {
		return (
			<SubmitTest
				showSubmitTestModal={showSubmitTestModal}
				setShowSubmitTestModal={setShowSubmitTestModal}
				data={data}
				setActiveState={setActiveState}
			/>
		);
	}

	if (showInstructionsModal) {
		return (
			<InstructionsModal
				guidelines={guidelines}
				loading={loading}
				setShowInstructionsModal={setShowInstructionsModal}
			/>
		);
	}

	if (!isFullscreen) {
		return (
			<WarningModal loading={loading} />
		);
	}

	return ((
		<div className={styles.main_container}>
			<div className={styles.left_container}>
				<LeftSection
					data={data}
					testData={testData}
					loading={loading}
					currentQuestion={currentQuestion}
					setCurrentQuestion={setCurrentQuestion}
					fetchQuestions={fetchQuestions}
					setShowLeaveTestModal={setShowLeaveTestModal}
					showTimeOverModal={showTimeOverModal}
					setShowTimeOverModal={setShowTimeOverModal}
					setActiveState={setActiveState}
				/>
			</div>

			<div key={data?.data} className={styles.right_container}>
				<RightSection
					data={data}
					loading={loading}
					currentQuestion={currentQuestion}
					fetchQuestions={fetchQuestions}
					setCurrentQuestion={setCurrentQuestion}
					setShowSubmitTestModal={setShowSubmitTestModal}
					setShowInstructionsModal={setShowInstructionsModal}
					setActiveState={setActiveState}
				/>
			</div>
		</div>
	)
	);
}

export default Ongoing;
