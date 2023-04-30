import { Textarea, Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateShipmentAdditionalService from '../../hooks/useUpdateShipmentAdditionalService';

import styles from './styles.module.css';

function CancelAdditionalService({
	id = '',
	showCancel = false,
	setShowCancel = () => {},
	refetch = () => {},
}) {
	const [remarkValues, setRemarkValues] = useState('');

	const onOuterClick = () => {
		setShowCancel(false);
	};

	const { cancelAdditionalService, loading } = useUpdateShipmentAdditionalService({ refetch });

	const onSubmit = () => {
		const payload = {
			id,
			remarks : [remarkValues],
			state   : 'cancelled',
		};
		cancelAdditionalService(payload);
	};

	return showCancel ? (
		<Modal
			show={showCancel}
			onClose={() => {
				setShowCancel(false);
			}}
			closable={false}
			onOuterClick={onOuterClick}
		>
			<Modal.Header title="Cancel Service" />
			<Modal.Body>
				<div className={styles.container}>
					<div style={{ height: '40vh' }}>
						<Textarea
							value={remarkValues}
							onChange={(e) => setRemarkValues(e)}
							placeholder="State reason for cancellation"
						/>
					</div>
					<div className={styles.button_container}>
						<Button
							themeType="primary"
							style={{ marginRight: '6px' }}
							onClick={() => {
								setShowCancel(false);
							}}
						>
							Cancel
						</Button>
						<Button onClick={onSubmit} disabled={loading} themeType="primary">
							Submit
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	) : null;
}

export default CancelAdditionalService;
