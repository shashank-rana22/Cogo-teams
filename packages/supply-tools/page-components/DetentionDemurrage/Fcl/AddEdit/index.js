import { Button, Modal } from '@cogoport/components';
import React, { useState, useRef } from 'react';

import checkSlabsSatifyingDaysLimit from '../../../../helpers/checkSlabsSatifyingDaysLimit';
import useCreateFclFreightRateFreeDay from '../../../../hooks/useCreateFclFreightRateFreeDay';

import Form from './Form';

function AddEdit({ refetchList = () => {} }) {
	const [showModal, setShowModal] = useState(false);
	const formRef = useRef(null);

	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	const { apiTrigger, loading = false } = useCreateFclFreightRateFreeDay({
		refetch: () => {
			refetchList();
			setShowModal(false);
		},
	});

	const handleSubmitForm = ({ data }) => {
		const isSatifyingDaysLimit = checkSlabsSatifyingDaysLimit({ data });

		if (isSatifyingDaysLimit) apiTrigger(data);
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
							disabled={loading}
							onClick={() => setShowModal(false)}
						>
							Cancel
						</Button>

						<Button
							onClick={onSubmit}
							disabled={loading}
						>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}

		</div>
	);
}

export default React.memo(AddEdit);
