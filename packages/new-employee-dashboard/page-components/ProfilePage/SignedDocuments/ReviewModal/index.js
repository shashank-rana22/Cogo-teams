import { Modal, Button } from '@cogoport/components';
import React from 'react';

import PreviewDocumet from '../../../../common/PreviewDocumet';

import SidePanel from './SidePanel';

export default function ReviewModal({
	showModal = false,
	setShowModal = () => {},
}) {
	const onClose = () => {
		setShowModal(false);
	};

	return (
		<Modal
			size="xl"
			show={showModal}
			onClose={onClose}
			placement="center"
			style={{ height: '88%', padding: '0 16px' }}
		>
			<Modal.Header title="Document Review Section" />
			{/* <Modal.Body> */}
			<div style={{ display: 'flex' }}>
				<PreviewDocumet
					document_header="Pan Card"
					height="76vh"
					width="840px"
				/>
				<SidePanel />
			</div>

		</Modal>
	);
}
