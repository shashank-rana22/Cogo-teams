import { Button, Modal } from '@cogoport/components';
import React, { useState, useRef } from 'react';

import Form from './Form';

function AddEdit({
	tncLevel = 'basicInfo',
	setTncLevel = () => {},
	isMobile = false,
	organizationId = null,
	setEditTncModalId = () => {},
	refetch = () => {},
}) {
	const CREATION_STEPS_MAPPING = {
		basicInfo: {
			key   : 'basicInfo',
			label : 'Basic Info',

		},
		termsAndCondition: {
			key   : 'termsAndCondition',
			label : 'Terms & Conditions',

		},
	};

	const [showModal, setShowModal] = useState(false);
	const formRef = useRef(null);

	// const onSubmitChange = () => {
	// 	formRef.current.formSubmit();
	// };

	return (
		<div>
			<Button onClick={() => setShowModal(true)}>
				+ Create
				{' '}
				{isMobile ? 'T & C' : 'New'}
			</Button>

			{showModal ? (
				<Modal show={showModal} onClose={() => setShowModal(false)} size="lg" placement="top">
					<Modal.Header title={CREATION_STEPS_MAPPING[tncLevel]?.label} />
					<Modal.Body>
						<Form
							ref={formRef}
							refetch={refetch}
							tncLevel={tncLevel}
							isMobile={isMobile}
							setTncLevel={setTncLevel}
							organizationId={organizationId}
							setEditTncModalId={setEditTncModalId}
						/>

					</Modal.Body>
				</Modal>
			) : null}

		</div>
	);
}

export default React.memo(AddEdit);
