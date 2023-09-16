import { Modal, Button, Toast } from '@cogoport/components';
import { useState, useRef } from 'react';

import useCreateFclFreightRateExtensions from '../../../../hooks/useCreateFclFreightRateExtensions';

import Form from './Form';
import styles from './styles.module.css';

function CreateFclExtension({ refetch = () => {} }) {
	const [show, setShow] = useState(false);

	const formRef = useRef(null);

	const { apiTrigger = () => {}, loading } = useCreateFclFreightRateExtensions({
		refetch: () => {
			refetch();
			setShow(false);
		},
	});

	const handleSubmitForm = ({ data }) => {
		const checkChargeDetails = (data?.line_item_charge_code
			&& data?.gri_currency
			&& data?.gri_rate)
			|| (data?.line_item_charge_code === data?.gri_currency
				&& data?.gri_currency === data?.gri_rate);

		if (!checkChargeDetails) {
			Toast.error('Please fill all the charge details');
			return;
		}

		apiTrigger({ values: data });
	};

	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	return (
		<div>
			<Button onClick={() => setShow(true)}>Create New Extensions</Button>

			{show ? (
				<Modal className={styles.modal} onClose={() => setShow(false)} show={show} placement="top" size="lg">
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
