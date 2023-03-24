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
				<b className={styles.heading}>Are you sure you want to leave the test?</b>

				<p>Doing so will result in a waste attempt</p>

				<StatsDisplay data={data} />

				<div className={styles.button_container}>
					<Button
						onClick={() => handleContinueTest()}
						style={{ marginRight: 12 }}
						themeType="secondary"
					>
						Cancel
					</Button>
					<Button themeType="accent" onClick={endTest}>Submit Test</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default SubmitTest;
