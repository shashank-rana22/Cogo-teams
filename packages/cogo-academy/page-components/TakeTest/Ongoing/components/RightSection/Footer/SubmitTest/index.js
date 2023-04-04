import { Button, Modal } from '@cogoport/components';

import handleEnterFullScreen from '../../../../../utils/handleEnterFullScreen';
import useEndTest from '../../../../hooks/useEndTest';
import StatsDisplay from '../../../utils/StatsDisplay';

import styles from './styles.module.css';

function SubmitTest({
	showSubmitTestModal,
	setShowSubmitTestModal,
	setActiveState,
	test_user_mapping_id,
	user_appearance,
	total_question_count,
}) {
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
				<b className={styles.heading}>Are you sure you want to Submit the test?</b>

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
					<Button loading={endTestLoading} themeType="accent" onClick={endTest}>Submit Test</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default SubmitTest;
