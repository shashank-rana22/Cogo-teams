import { Button, Modal } from '@cogoport/components';

import useEndTest from '../../../../hooks/useEndTest';

import styles from './styles.module.css';

function LeaveTest({ leaveTest, setLeaveTest }) {
	const { endTest } = useEndTest();

	return (
		<Modal size="sm" show={leaveTest} onClose={setLeaveTest}>
			<Modal.Body>
				<b className={styles.heading}>Are you sure you want to leave the test?</b>

				<p>Doing so will result in a waste attempt</p>

				<div className={styles.button_container}>
					<Button
						onClick={endTest}
						style={{ marginRight: 12 }}
						themeType="secondary"
					>
						Yes, I want to leave
					</Button>
					<Button themeType="accent" onClick={() => setLeaveTest(false)}>Continue the test</Button>
				</div>
			</Modal.Body>
		</Modal>

	);
}

export default LeaveTest;
