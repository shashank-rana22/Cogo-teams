import { Modal } from '@cogoport/components';
import React from 'react';

function CallModal({ url = '' }) {
	return (
		<Modal show size="fullscreen" placement="center">
			<iframe
				src={url}
				type="application/pdf"
				width="100%"
				height="100%"
				title="Document"
				style={{ border: 'none' }}
			/>
		</Modal>
	);
}

export default CallModal;
