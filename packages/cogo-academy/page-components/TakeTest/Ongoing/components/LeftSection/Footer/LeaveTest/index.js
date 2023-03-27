import { Button, Modal } from '@cogoport/components';

import handleEnterFullScreen from '../../../../../utils/handleEnterFullScreen';
import useEndTest from '../../../../hooks/useEndTest';
import StatsDisplay from '../../../utils/StatsDisplay';

import styles from './styles.module.css';

function LeaveTest({ showLeaveTestModal, setShowLeaveTestModal, setActiveState, data = {} }) {
	const { endTest, endTestLoading } = useEndTest({ setActiveState, setShowTimeOverModal: setShowLeaveTestModal });

	const handleContinueTest = () => {
		handleEnterFullScreen();
		setShowLeaveTestModal(false);
	};

	return (
		<Modal size="md" show={showLeaveTestModal} onClose={setShowLeaveTestModal}>
			<Modal.Body>
				<b className={styles.heading}>Are you sure you want to leave the test?</b>

				<p>Doing so will result in a waste attempt</p>

				<StatsDisplay data={data} />

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
