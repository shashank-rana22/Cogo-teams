import { Modal, Button } from '@cogoport/components';
import React from 'react';

import ModalContent from '../ModalContent';

function WalletModal({
	show = false,
	onClose = () => {},
	organization_id = '',
	service = '',
	data = {},
	formProps = {},
	handleGenerateCode = () => {},
	createLoading = false,
}) {
	const { handleSubmit } = formProps;

	return (
		<Modal
			size="md"
			show={show}
			onClose={onClose}
			placement="top"
			style={{ minWidth: 800 }}
		>
			<Modal.Body style={{ maxHeight: 600 }}>
				<ModalContent
					data={data}
					service={service}
					organization_id={organization_id}
					onClose={onClose}
					formProps={formProps}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					size="md"
					themeType="accent"
					onClick={handleSubmit(handleGenerateCode)}
					loading={createLoading}
					disabled={createLoading}
				>
					Generate & Proceed
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default WalletModal;
