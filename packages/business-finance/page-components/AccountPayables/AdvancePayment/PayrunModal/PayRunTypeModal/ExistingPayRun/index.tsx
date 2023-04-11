import { Radio, Modal, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import List from '../../../../../commons/List';

import { PaymentReadyConfig } from './paymentReadyTable';
import styles from './styles.module.css';

const list = {
	list: [
		{
			payrunName : 'PayRun_301_0222_15:34_4',
			amount     : '765575',
			count      : 22,
			date       : '03:35PM 22-02-2023',
		},
		{
			payrunName : 'PayRun_301_0222_14:19_9',
			amount     : '4235345575',
			count      : 282,
			date       : '03:35PM 22-02-2023',
		},
	],
};

function ExitingPayRun({ exitPayRun, setExitPayRun }) {
	const {push} =useRouter();
	const handleClick = () => (
		push('/business-finance/account-payables/advance-payment/add-into-existing-payrun')
	);
	const functions = {
		renderRadio: (itemData) => {
			const handleRadioChange = () => {
				if (itemData?.selectedRadio) {
					// setRadio({});
				} else {
					// setRadio(itemData);
				}
			};

			return (
				<div
					style={{
						height         : 35,
						justifyContent : 'center',
						alignItems     : 'center',
					}}

				>
					<Radio
						className="primary lg"
						checked={itemData.selectedRadio}
						onChange={handleRadioChange}
					/>
				</div>
			);
		},
	};
	return (
		<div>
			<Modal size="lg" show={exitPayRun} onClose={() => { setExitPayRun(false); }} placement="top">
				<Modal.Header title="Payment Ready PayRuns" />
				<Modal.Body>
					<div className={styles.header}>
						Select a pay run you want to add to.
					</div>
					<List config={PaymentReadyConfig} itemData={list} functions={functions} rowStyle="border" />
				</Modal.Body>
				<Modal.Footer>
					<Button themeType="secondary" onClick={() => { setExitPayRun(false); }}>Cancel</Button>
					<div className={styles.button}>
						<Button onClick={handleClick}>Confirm</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ExitingPayRun;
