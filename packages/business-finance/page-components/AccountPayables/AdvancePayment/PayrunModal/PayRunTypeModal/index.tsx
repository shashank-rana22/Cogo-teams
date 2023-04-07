import { Modal, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import ExitingPayRun from './ExistingPayRun';
import styles from './styles.module.css';

function PayRunTypeModal({ payRunType, setPayRunType }) {
	const { push } = useRouter();
	const handleClick = () => (
		push('/business-finance/account-payables/advance-payment/create-new-payrun')
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
		</div>
	);
}

export default PayRunTypeModal;
