import { Modal, Button } from '@cogoport/components';
import React from 'react';

function Content({
	cargoModal = 'progress',
	setCargoModal = () => {},
	setShowForm = () => {},
}) {
	const onClose = () => setCargoModal('not_needed');

	return (
		<Modal
			size="md"
			show={cargoModal === 'progress'}
			onClose={onClose}
			closeOnOuterClick={false}
			showCloseIcon={false}
		>
			<Modal.Header title="Do you want to add Cargo Insurance?" />

			<Modal.Body>
				It is estimated that almost $50 billion worth of cargo is lost due to
				insurance not being there. We highly recommend that you opt-in for the
				same.
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					themeType="secondary"
					// disabled={loading || addCargoLoading}
					onClick={() => setCargoModal('success')}
					size="md"
				>
					No, I like to live dangerously
				</Button>

				<Button
					type="button"
					style={{ marginLeft: 12 }}
					themeType="primary"
					onClick={() => { setCargoModal('progress'); setShowForm(true); }}
				>
					Yes, I want to insure my cargo
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Content;
