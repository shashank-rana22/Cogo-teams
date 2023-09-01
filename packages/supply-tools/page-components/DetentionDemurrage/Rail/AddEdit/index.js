import { Button, Modal } from '@cogoport/components';
import React, { useState, useRef } from 'react';

import checkSlabsSatifyingDaysLimit from '../../../../helpers/checkSlabsSatifyingDaysLimit';
import useCreateRailDomesticFreightRateFreeDay from '../../../../hooks/useCreateRailDomesticFreightRateFreeDay';

import Form from './Form';

function AddEdit({ refetchList = () => {} }) {
	const [showModal, setShowModal] = useState(false);
	const formRef = useRef(null);

	const { apiTrigger = () => {}, loading = false } = useCreateRailDomesticFreightRateFreeDay({
		refetch: () => {
			refetchList();
			setShowModal(false);
		},
	});

	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	const handleSubmitForm = ({ data }) => {
		const isSatifyingDaysLimit = checkSlabsSatifyingDaysLimit({ data });

		if (isSatifyingDaysLimit) apiTrigger(data);
	};

	return (
		<div>
			<Button onClick={() => setShowModal(true)}>ADD + </Button>

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

		</div>
	);
}

export default React.memo(AddEdit);
