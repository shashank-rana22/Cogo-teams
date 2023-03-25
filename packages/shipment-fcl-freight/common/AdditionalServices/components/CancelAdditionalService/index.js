import { Textarea, Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateAdditionalService from '../../../../hooks/useUpdateAdditionalService';

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
	const { updateServiceList, loading } = useUpdateAdditionalService({
		id,
		remarkValues,
		refetch,
		setShowCancel,
	});

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
					<div style={{ height: '48vh' }}>
						<Textarea
							value={remarkValues}
							onChange={(e) => setRemarkValues(e)}
							placeholder="State reason for cancellation"
						/>
					</div>
					<div className={styles.button_container}>
						<Button
							themeType="secondary"
							style={{ marginRight: '6px' }}
							onClick={() => {
								setShowCancel(false);
							}}
						>
							Cancel
						</Button>
						<Button onClick={updateServiceList} disabled={loading} themeType="secondary">
							Submit
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	) : null;
}

export default CancelService;
