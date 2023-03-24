import { Button, Modal } from '@cogoport/components';

import handleEnterFullScreen from '../../../../../utils/handleEnterFullScreen';
import useEndTest from '../../../../hooks/useEndTest';
import StatsDisplay from '../../../utils/StatsDisplay';

import styles from './styles.module.css';

function SubmitTest({ showSubmitTestModal, setShowSubmitTestModal, data = {}, setActiveState }) {
	const { endTest } = useEndTest({ setActiveState });

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

				<StatsDisplay data={data} />

				<div className={styles.button_container}>
					<Button
						onClick={() => handleContinueTest()}
						style={{ marginRight: 12 }}
						themeType="secondary"
					>
						Go Back To Test
					</Button>
					<Button themeType="accent" onClick={endTest}>Submit Test</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default SubmitTest;
