import { Toast, Button, Modal } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState, useEffect } from 'react';

import LeftSection from './components/LeftSection';
import RightSection from './components/RightSection';
import useFetchQuestionsList from './hooks/useFetchQuestionList';
import styles from './styles.module.css';

function Ongoing({ testData, startTiming, page }) {
	const router = useRouter();

	const [currentQuestion, setCurrentQuestion] = useState(page || 1);

	const duration = testData?.test_duration;
	const { loading, data, fetchQuestions } = useFetchQuestionsList({ currentQuestion, startTiming, duration });

	const [isFullscreen, setIsFullscreen] = useState(false);

	const handleEnterFullScreen = () => {
		const elem = document.getElementById('maincontainer');

		if (elem?.requestFullscreen) {
			elem?.requestFullscreen();
		} else if (elem?.webkitRequestFullscreen) { /* Safari */
			elem?.webkitRequestFullscreen();
		} else if (elem?.msRequestFullscreen) { /* IE11 */
			elem?.msRequestFullscreen();
		}
	};

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

			if (document.fullscreen) {
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

	const items = ['Exam can be only taken in full screen',
		'To continue test, please click on continue',
		// eslint-disable-next-line max-len
		'You will be redirected to dashboard if you switch tabs.If you switch tabs more than 2 times, your exam will be submitted automatically',
		'To submit the test, please click on submit test button'];

	if (!isFullscreen) {
		return (
			<Modal showCloseIcon={false} size="md" show className={styles.modal_container}>
				<Modal.Header title="Are you sure?" />

				<Modal.Body>
					<ul className={styles.list}>
						{items.map((item, index) => (
							<li key={item} className={`${styles.list} ${styles[`list_${index}`]}`}>
								{item}
							</li>
						))}
					</ul>
				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						style={{ marginRight: 10 }}
						themeType="secondary"
					>
						Submit Test
					</Button>

					<Button
						size="md"
						onClick={handleEnterFullScreen}
						loading={loading}
					>
						continue
					</Button>
				</Modal.Footer>
			</Modal>
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
					startTiming={startTiming}
					fetchQuestions={fetchQuestions}
				/>
			</div>

			<div key={data?.data} className={styles.right_container}>
				<RightSection
					data={data}
					loading={loading}
					currentQuestion={currentQuestion}
					fetchQuestions={fetchQuestions}
					setCurrentQuestion={setCurrentQuestion}
				/>
			</div>
		</div>
	)
	);
}

export default Ongoing;
