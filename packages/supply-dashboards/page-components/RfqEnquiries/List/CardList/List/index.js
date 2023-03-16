import { Placeholder, Modal, Button, Checkbox } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useUpdateRfq from '../../../hooks/useUpdateRfq';

import styles from './styles.module.css';

function List({
	fields, item, loading, headerRequired, setSelectedRate, selectedRate, status,
}) {
	const { push } = useRouter();

	const [show, setShow] = useState(false);
	const [reason, setReason] = useState(null);
	const handleOnClick = () => {
		if (headerRequired) {
			push(
				'/supply/dashboards/rfq-enquiries/[id]',
				`/supply/dashboards/rfq-enquiries/${item?.id}`,
			);
		}
	};

	const { updateRfq } = useUpdateRfq({ item, reason, setShow });

	const handleCloseModal = () => {
		updateRfq();
	};

	const handleOnChange = (val) => {
		if (reason === val) {
			setReason(null);
		} else {
			setReason(val);
		}
	};

	return (
		<div className={styles.container}>
			{fields.map((field) => {
				const { label, flex, key } = field;
				return (
					<div
						role="presentation"
						onClick={() => {
							if (status === 'awaiting_responses') { handleOnClick(); }
						}}
						className={headerRequired ? styles.item : styles.smallItem}
						key={key || label}
						style={{ flex }}
					>
						{loading ? (
							<div className={styles.placeholder}>
								{' '}
								<Placeholder />
							</div>
						)
							: field.render(item, setSelectedRate, selectedRate, show, setShow) }
					</div>

				);
			})}
			{!headerRequired && <div className={styles.line} />}
			<Modal show={show} onClose={() => setShow(false)}>
				<Modal.Header title="Reason For Closing This RFQ?" />
				<Modal.Body>
					<Checkbox label="1" value="1" onChange={() => handleOnChange('1')} checked={reason === '1'} />
					<Checkbox label="2" value="1" onChange={() => handleOnChange('2')} checked={reason === '2'} />
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleCloseModal}>Close</Button>
				</Modal.Footer>

			</Modal>
		</div>

	);
}
export default List;
