import { Modal, Button } from '@cogoport/components';
import React from 'react';

function PreviewAndSubmit({
	show = false,
	setShow = () => {},
	handleUpdate = () => {},
	data = {},
	loading,
}) {
	const sendEmail = () => {
		handleUpdate({ preview: false });
	};

	return (
		<Modal
			show={show}
			onClose={() => setShow(!show)}
			interactive
			width={700}
		>
			<Modal.Body>
				<div
					dangerouslySetInnerHTML={{
						__html: data?.template,
					}}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={sendEmail} disabled={loading}>
					Send Email
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default PreviewAndSubmit;
