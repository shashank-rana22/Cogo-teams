import { Button, TextArea } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function SecondStep({ item, status, setSecondStep, updateDatas }) {
	const {
		handleShipperRevision,
		// handleShipperSideCancel,
		// handleSupplierCancel,
		remarks,
		setRemarks,
		// loading,
	} = updateDatas;

	let functionToExecute = null;
	if (status?.status === 'customer_confirmation_pending') {
		functionToExecute = handleShipperRevision;
	}

	return (
		<div className={styles.container}>
			<ContainerHeader>
				{item.name}
				&nbsp;
				(
				{startCase(item.service_type)}
				)
			</ContainerHeader>

			<Warning>* Please tell us the reason for this change.</Warning>

			<TextArea
				placeholder="Type here..."
				value={remarks}
				onChange={(e) => setRemarks(e.target.value)}
			/>

			<ButtonContainer>
				<Button
					onClick={() => setSecondStep(null)}
					style={{ marginRight: 10 }}
					className="secondary md"
				>
					GO BACK
				</Button>

				<Button
					onClick={functionToExecute}
					style={{ border: '1px solid #393f70' }}
				>
					REQUEST CHANGES
				</Button>
			</ButtonContainer>
		</div>
	);
}

export default SecondStep;
