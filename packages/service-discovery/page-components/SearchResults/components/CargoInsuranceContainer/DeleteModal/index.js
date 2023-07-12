import { Modal, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

function DeleteModal({ show = false, setShow = () => {}, service = {}, ...rest }) {
	return (
		<Modal
			size={rest.size || 'sm'}
			show={show}
			onClose={() => setShow(false)}
			closeOnOuterClick={false}
		>
			<Modal.Header title={`Are you sure you want to delete ${startCase(rest.service_name || service.name)}`} />

			<Modal.Footer>
				<Button
					type="button"
					themeType="primary"
					onClick={() => setShow(false)}
				>
					Cancel
				</Button>

				<Button
					type="button"
					style={{ marginLeft: 12 }}
					themeType="secondary"
				>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteModal;
