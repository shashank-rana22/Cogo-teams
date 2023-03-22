import { Textarea, Button, RadioGroup, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import { IRN_CANCEL_OPTIONS } from '../../constants';
import useGetIrnCancellation from '../../hooks/useGetIrnCancellation';

import styles from './styles.module.css';

function CancellationModal({
	itemData,
	showCancellationModal,
	setShowCancellationModal,
}) {
	const { cancelIrn, loading } = useGetIrnCancellation({
		id: itemData?.id,
		setShowCancellationModal,
	});
	const [response, setResponse] = useState({
		value   : '',
		remarks : '',
	});

	return (
		<Modal show={showCancellationModal} onClose={() => setShowCancellationModal(false)} size="md">
			<div style={{ display: 'flex', flexDirection: 'column', padding: '10px 5px' }}>
				<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
					<div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '12px' }}>
						Cancel IRN Of Invoice Number
						{' '}
						{itemData?.invoiceNumber}
					</div>
					<div className={styles.Radiodiv}>
						<div style={{ margin: '12px 0px 6px 0px', fontSize: '16px' }}>
							Reason
						</div>

						<RadioGroup
							options={IRN_CANCEL_OPTIONS}
							value={response?.value}
							onChange={(e) => {
								setResponse((r) => ({ ...r, value: e }));
							}}
						/>
					</div>
					<div>
						<div style={{ margin: '12px 0px 6px 0px', fontSize: '16px' }}>
							Remarks
						</div>
						<Textarea
							value={response?.remarks}
							onChange={(e) => {
								setResponse((r) => ({ ...r, remarks: e }));
							}}
							placeholder="Not more than 100 characters"
						/>
					</div>
				</div>
				<div style={{ display: 'flex', marginTop: '12px' }}>
					<Button
						onClick={() => {
							cancelIrn(response);
						}}
						disabled={
							response.value === '' || response.remarks === '' || loading
						}
					>
						Confirm
					</Button>
				</div>
			</div>
		</Modal>
	);
}
export default CancellationModal;
