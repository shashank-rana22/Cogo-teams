import { Button, Modal } from '@cogoport/components';
import { TextAreaController, useForm } from '@cogoport/forms';
import React from 'react';

import controls from '../../../../configurations';

function CreateWallet({ createWallet, setCreateWallet }) {
	const { handleSubmit, control, formState: { errors } } = useForm();

	const { feedbackDesc, bb } = controls;
	console.log(feedbackDesc, bb, errors);

	return (
		<Modal size="md" show={createWallet} onClose={() => setCreateWallet(!createWallet)} placement="top">
			<Modal.Header title="Automation Wallet" />
			<Modal.Body>
				<form onSubmit={handleSubmit()}>
					<TextAreaController
						control={control}
						{...feedbackDesc}
					/>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={setCreateWallet}>Save And Proceed</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateWallet;
