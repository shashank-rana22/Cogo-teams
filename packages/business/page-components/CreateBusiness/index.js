import { Button, Modal } from '@cogoport/components';
import React, { useState, useRef } from 'react';

import useCreateBusiness from '../../hooks/useCreateBusiness';

import Form from './Form';
import styles from './styles.module.css';

function AddEdit({
	refetch = () => {},
}) {
	const [showModal, setShowModal] = useState(false);
	const formRef = useRef(null);
	const onSubmit = () => {
		formRef.current.formSubmit();
	};
	const { apiTrigger, loading } = useCreateBusiness({ refetch, setShowModal });
	const handleSubmitForm = (values) => {
		apiTrigger(values);
	};
	return (
		<div>
			<Button onClick={() => setShowModal(true)}>
				Create
			</Button>

			{showModal ? (
				<Modal
					show={showModal}
					onClose={() => { setShowModal(false); }}
					size="lg"
					placement="top"
				>
					<Modal.Header title="Create Business" />
					<Modal.Body>
						<Form
							setShowModal={setShowModal}
							ref={formRef}
							refetch={refetch}
							handleSubmitForm={handleSubmitForm}
						/>

					</Modal.Body>
					<Modal.Footer>
						<div className={styles.btn_align}>
							<Button onClick={() => setShowModal(false)}>
								Cancel
							</Button>
							<Button onClick={onSubmit} disabled={loading}>
								Create
							</Button>
						</div>

					</Modal.Footer>
				</Modal>
			) : null}

		</div>
	);
}

export default React.memo(AddEdit);
