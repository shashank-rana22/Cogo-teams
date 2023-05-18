import { Modal, Button, Checkbox } from '@cogoport/components';
import { useState } from 'react';

import useUpdateShipmentCreditNote from '../../../../hooks/useUpdateShipmentCreditNote';

import styles from './styles.module.css';

function Review({
	setOpen = () => {},
	id = '',
	CNRefetch = () => {},
}) {
	const [value, setValue] = useState(false);

	const { loading, apiTrigger } = useUpdateShipmentCreditNote({ refetch: CNRefetch });

	const handleUpdate = () => {
		apiTrigger({
			id,
			status: value ? 'reviewed' : undefined,
		});
		setOpen(false);
	};
	return (
		<Modal
			show
			onClose={() => setOpen(false)}
			className={styles.custom_modal}
		>
			<Modal.Header title="MARK AS REVIEWED" />
			<Modal.Body>

				<form className={styles.form}>
					<Checkbox
						checked={value}
						onChange={() => setValue(!value)}
					/>
					<div role="button" tabIndex={0} onClick={() => setValue(!value)}>
						I have verified the Credit Note and ensured that all the services taken
						& charges incurred during the shipment have been billed to the customer
					</div>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_wrapper}>
					<Button
						themeType="secondary"
						onClick={() => setOpen(false)}
						disabled={loading}
					>
						Close
					</Button>

					<Button
						onClick={handleUpdate}
						disabled={loading || !value}
					>
						Review
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default Review;
