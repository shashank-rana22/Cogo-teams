import { Button, Modal } from '@cogoport/components';

import handleEnterFullScreen from '../../../../../utils/handleEnterFullScreen';
import useEndTest from '../../../../hooks/useEndTest';
import Timer from '../../../LeftSection/Header/Timer';
import StatsDisplay from '../../../utils/StatsDisplay';

import styles from './styles.module.css';

function SubmitTest({
	showSubmitTestModal,
	setShowSubmitTestModal,
	setActiveState,
	test_user_mapping_id,
	user_appearance,
	total_question_count,
	start_time,
	testData,
	setShowTimeOverModal,
}) {
	const { test_duration } = testData || {};

	const time = new Date(start_time).getTime();

	const { endTest, endTestLoading } = useEndTest({
		setActiveState,
		setShowTimeOverModal: setShowSubmitTestModal,
		test_user_mapping_id,
	});

	const handleContinueTest = () => {
		handleEnterFullScreen();
		setShowSubmitTestModal(false);
	};

	return (
		<Modal size="md" show={showSubmitTestModal} onClose={setShowSubmitTestModal}>
			<Modal.Body>
				<div className={styles.flex_container}>
					<b className={styles.heading}>Are you sure you want to Submit the test?</b>

					<Timer
						test_start_time={time}
						duration={test_duration}
						setShowTimeOverModal={setShowTimeOverModal}
					/>
				</div>

				<p>
					You still have time left, check before submitting.
					You cannot come back to the test once submitted.
				</p>

				<StatsDisplay data={user_appearance} total_question_count={total_question_count} />

				<div className={styles.button_container}>
					<Button
						onClick={() => handleContinueTest()}
						style={{ marginRight: 12 }}
						themeType="secondary"
						disabled={endTestLoading}
					>
						Go Back To Test
					</Button>

					<Button
						type="button"
						loading={endTestLoading}
						themeType="accent"
						onClick={endTest}
					>
						Submit Test
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default SubmitTest;
