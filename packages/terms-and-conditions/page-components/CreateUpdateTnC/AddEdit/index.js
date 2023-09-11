import { Button, Modal } from '@cogoport/components';
import React, { useState, useRef } from 'react';

import CREATION_STEPS_MAPPING from '../../../config/creation-step-mapping.json';

import Form from './Form';

function AddEdit({
	tncLevel = 'basicInfo',
	setTncLevel = () => {},
	organizationId = null,
	setEditTncModalId = () => {},
	refetch = () => {},
}) {
	const [showModal, setShowModal] = useState(false);
	const formRef = useRef(null);

	return (
		<div>
			<Button onClick={() => setShowModal(true)}>
				Create
			</Button>

			{showModal ? (
				<Modal
					show={showModal}
					onClose={() => { setShowModal(false); setTncLevel('basicInfo'); }}
					size="lg"
					placement="top"
				>
					<Modal.Header title={CREATION_STEPS_MAPPING[tncLevel]?.label} />
					<Modal.Body>
						<Form
							setShowModal={setShowModal}
							ref={formRef}
							refetch={refetch}
							tncLevel={tncLevel}
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
