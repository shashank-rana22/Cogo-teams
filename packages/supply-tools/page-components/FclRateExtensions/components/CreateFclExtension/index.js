import { Modal, Button } from '@cogoport/components';
import { useState, useRef } from 'react';

import useCreateUpdateFclFreightRateExtensions from '../../../../hooks/useCreateUpdateFclFreightRateExtensions';

import Form from './Form';

function CreateFclExtension({ refetch = () => {} }) {
	const [show, setShow] = useState(false);

	const formRef = useRef(null);

	const { apiTrigger = () => {}, loading } = useCreateUpdateFclFreightRateExtensions({
		refetch: () => {
			refetch();
			setShow(false);
		},
	});

	const handleSubmitForm = ({ data }) => {
		apiTrigger({ values: data });
	};

	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	return (
		<div>
			<Button size="lg" onClick={() => setShow(true)}>Create New Extensions</Button>

			{show ? (
				<Modal onClose={() => setShow(false)} show={show} placement="top" size="lg">
					<Modal.Header title="ADD FCL FREIGHT RATE EXTENSION" />
					<Modal.Body>
						<Form handleSubmitForm={handleSubmitForm} ref={formRef} />
					</Modal.Body>

					<Modal.Footer>
						<Button
							themeType="secondary"
							style={{ marginRight: 8 }}
							disabled={loading}
							onClick={() => setShow(false)}
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

export default CreateFclExtension;
