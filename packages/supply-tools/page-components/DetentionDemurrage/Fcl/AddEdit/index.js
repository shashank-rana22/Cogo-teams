import { Button, Modal } from '@cogoport/components';
import React, { useState, useRef } from 'react';

import Form from './Form';

function AddEdit() {
	const [showModal, setShowModal] = useState(false);
	const formRef = useRef(null);

	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	const handleSubmitForm = (values) => {
		console.log({ values }, 'ADD FCL');
	};

	return (
		<div>
			<Button onClick={() => setShowModal(true)}>ADD + </Button>

			{showModal ? (
				<Modal show={showModal} onClose={() => setShowModal(false)} size="lg" placement="top">
					<Modal.Header title="Add Detention / Demurrage" />
					<Modal.Body>
						<Form ref={formRef} handleSubmitForm={handleSubmitForm} />
					</Modal.Body>

					<Modal.Footer>
						<Button
							themeType="secondary"
							style={{ marginRight: 8 }}
						>
							Cancel
						</Button>

						<Button onClick={onSubmit}>Submit</Button>
					</Modal.Footer>
				</Modal>
			) : null}

		</div>
	);
}

export default React.memo(AddEdit);
