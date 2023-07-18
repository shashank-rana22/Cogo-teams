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
			style={{ minWidth: 800 }}
			placement="top"
			show={show}
			size="md"
			onClose={onClose}
		>
			<Modal.Body style={{ maxHeight: 600 }}>
				<ModalContent
					organization_id={organization_id}
					service={service}
					data={data}
					onClose={onClose}
					formProps={formProps}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					size="md"
					themeType="accent"
					onClick={handleSubmit(handleGenerateCode)}
					loading={createLoading}
					disabled={createLoading}
				>
					Generate & Publish
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default WalletModal;
