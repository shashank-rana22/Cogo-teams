import { Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';

import CreateNewPayRun from '../../CreateNewPayRun';

import ExitingPayRun from './ExistingPayRun';
import styles from './styles.module.css';

function PayRunTypeModal({ payRunType, setPayRunType }) {
	const [newPayRun, setNewPayRun] = useState(false);
	const handleClick = () => (
		setNewPayRun(true)
	);
	const [exitPayRun, setExitPayRun] = useState(false);
	return (
		<div className={styles.container}>
			<Modal size="md" show={payRunType} onClose={() => setPayRunType(false)} placement="top">
				{/* <Modal.Header title="Are you sure?" /> */}
				<Modal.Body>
					<div className={styles.sub_container}>
						2  Pay Runs Available with same entity & currency.
						You can either create a new payrun or add more invoices into existing one.
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setExitPayRun(true)} themeType="secondary">
						Add Into Existing Pay Run
					</Button>
					<div className={styles.button}>
						<Button themeType="secondary" onClick={handleClick}>Create New Pay Run</Button>
					</div>
				</Modal.Footer>
			</Modal>
			{exitPayRun && <ExitingPayRun exitPayRun={exitPayRun} setExitPayRun={setExitPayRun} />}
			{newPayRun && <CreateNewPayRun newPayRun={newPayRun} setNewPayRun={setNewPayRun} />}
		</div>
	);
}

export default PayRunTypeModal;
