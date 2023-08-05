import { Modal, Button } from '@cogoport/components';
import React from 'react';

function Content({
	cargoModal = 'progress',
	setCargoModal = () => {},
	setShowForm = () => {},
	goToCheckout = () => {},
}) {
	const onClose = () => {
		setCargoModal('success');
		goToCheckout();
	};

	const onProceed = () => {
		setCargoModal('progress');
		setShowForm(true);
	};

	return (
		<Modal
			size="md"
			show={cargoModal === 'progress'}
			onClose={onClose}
			closeOnOuterClick={false}
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
					onClick={onClose}
					size="md"
				>
					No, I like to live dangerously
				</Button>

				<Button
					type="button"
					style={{ marginLeft: 12 }}
					themeType="primary"
					onClick={onProceed}
				>
					Yes, I want to insure my cargo
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Content;
