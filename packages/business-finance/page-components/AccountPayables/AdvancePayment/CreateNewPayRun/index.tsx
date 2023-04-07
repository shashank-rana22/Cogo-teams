import { Modal, Button } from '@cogoport/components';
import React from 'react';

function CreateNewPayRun({ newPayRun, setNewPayRun }) {
	return (
		<div>
			<Modal size="fullscreen" show={newPayRun} onClose={() => { setNewPayRun(false); }} placement="bottom">
				<Modal.Header title="Are you sure?" />
				<Modal.Body>
					et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
					consequuntur, voluptates tenetur rem obcaecati sap
					iente aliquam animi voluptas. Pariatur eaque aut sunt?
					Lorem ipsum, dolor sit amet consectetur adipisi
					cing elit. Quis, assumenda. Hic ipsam doloremque assumenda
					et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
					Pariatur eaque aut sunt?
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => { setNewPayRun(false); }}>OK</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CreateNewPayRun;
