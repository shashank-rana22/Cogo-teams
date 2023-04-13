import { Textarea, Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateShipmentAdditionalService from '../../../../hooks/useUpdateShipmentAdditionalService';

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

	const closeModal = () => setShowCancel(false);

	return showCancel ? (
		<Modal
			show
			onClose={closeModal}
			showCloseIcon={!loading}
			closeOnOuterClick={false}
		>
			<Modal.Header title="Cancel Service" />
			<Modal.Body>
				<Textarea
					value={remarkValues}
					onChange={(e) => setRemarkValues(e)}
					placeholder="State reason for cancellation"
					style={{ height: '100px' }}
				/>

			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="secondary"
					style={{ marginRight: '12px' }}
					onClick={closeModal}
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
