import { Textarea, Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateShipmentAdditionalService from '../../../../hooks/useUpdateShipmentAdditionalService';

import styles from './styles.module.css';

function CancelAdditionalService({
	id = '',
	showCancel = false,
	setShowCancel = () => {},
	refetch = () => {},
}) {
	const [remarkValues, setRemarkValues] = useState('');

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
			show
			onClose={() => setShowCancel(false)}
			showCloseIcon={!loading}
			closeOnOuterClick={false}
			className={styles.custom_modal}
		>
			<Modal.Header title="Cancel Service" />

			<Modal.Body>
				<Textarea
					value={remarkValues}
					onChange={(e) => setRemarkValues(e)}
					placeholder="State reason for cancellation"
				/>

			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary"
					onClick={() => setShowCancel(false)}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button onClick={onSubmit} disabled={loading} themeType="primary">
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	) : null;
}

export default CancelAdditionalService;
