import { TextArea, Button } from '@cogoport/components';
import React, { useState } from 'react';

// import updateAdditionalService from '../../hooks/useCancelAdditionalService';

import styles from './styles.module.css';

function CancelService({
	id = '',
	showCancel = false,
	setShowCancel = () => {},
	refetch = () => {},
}) {
	const [remarkValues, setRemarkValues] = useState('');

	const onOuterClick = () => {
		setShowCancel(false);
	};
	// const { updateServiceList, loading } = updateAdditionalService({
	// 	id,
	// 	remarkValues,
	// 	refetch,
	// 	setShowCancel,
	// });

	return showCancel ? (
		<StyledModal
			className="prinary md"
			show={showCancel}
			onClose={() => {
				setShowCancel(false);
			}}
			closable={false}
			onOuterClick={onOuterClick}
		>
			<div className={styles.container}>
				<div style={{ height: '48vh' }}>
					<TextArea
						style={{ resize: 'none' }}
						value={remarkValues}
						onChange={(e) => setRemarkValues(e?.target?.value)}
						placeholder="State reason for cancellation"
					/>
				</div>
				<ButtonRow>
					<Button
						className="secondary sm"
						style={{ marginRight: '6px' }}
						onClick={() => {
							setShowCancel(false);
						}}
					>
						Cancel
					</Button>
					<Button onClick={updateServiceList} disabled={loading}>
						Submit
					</Button>
				</ButtonRow>
			</div>
		</StyledModal>
	) : null;
}

export default CancelService;
