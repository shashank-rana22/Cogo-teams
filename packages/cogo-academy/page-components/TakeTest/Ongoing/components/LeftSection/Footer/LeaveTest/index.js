import { Button, Modal } from '@cogoport/components';

import handleEnterFullScreen from '../../../../../utils/handleEnterFullScreen';
import useEndTest from '../../../../hooks/useEndTest';
import StatsDisplay from '../../../utils/StatsDisplay';
import Timer from '../../Header/Timer';

import styles from './styles.module.css';

function LeaveTest({
	showLeaveTestModal,
	setShowLeaveTestModal,
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
		setShowTimeOverModal: setShowLeaveTestModal,
		test_user_mapping_id,
	});

	const handleContinueTest = () => {
		handleEnterFullScreen();
		setShowLeaveTestModal(false);
	};

	return (
		<Modal size="md" show={showLeaveTestModal} onClose={setShowLeaveTestModal}>
			<Modal.Body>
				<div className={styles.flex_container}>
					<div>
						<b className={styles.heading}>Are you sure you want to leave the test?</b>

						<p>Doing so will result in a waste attempt</p>
					</div>

					<Timer
						test_start_time={time}
						duration={test_duration}
						setShowTimeOverModal={setShowTimeOverModal}
					/>
				</div>

				<StatsDisplay data={user_appearance} total_question_count={total_question_count} />

				<div className={styles.button_container}>
					<Button
						type="button"
						onClick={endTest}
						style={{ marginRight: 12 }}
						themeType="secondary"
						loading={endTestLoading}
					>
						Yes, I want to leave
					</Button>

					<Button
						type="button"
						disabled={endTestLoading}
						themeType="accent"
						onClick={() => handleContinueTest()}
					>
						Continue the test
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default LeaveTest;
