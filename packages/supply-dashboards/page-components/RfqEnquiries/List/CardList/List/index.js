import { Placeholder, Modal, Button, Checkbox } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useCreateRfqSupplyAgentPreference from '../../../hooks/useCreateRfqSupplyAgentPreference';

import styles from './styles.module.css';

function List({
	fields, item, loading, headerRequired, setSelectedRate, selectedRate, status, refetch,
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

	const { createRfqSupplyAgentPreference } = useCreateRfqSupplyAgentPreference({ item, reason, setShow, refetch });

	const handleCloseModal = () => {
		createRfqSupplyAgentPreference();
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
					<Checkbox
						label="Request not serviceable"
						value="request_not_serviceable"
						onChange={() => handleOnChange('request_not_serviceable')}
						checked={reason === 'request_not_serviceable'}
					/>
					<Checkbox
						label="No space with service provider"
						value="no_space_with_service_provider"
						onChange={() => handleOnChange('no_space_with_service_provider')}
						checked={reason === 'no_space_with_service_provider'}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleCloseModal} disabled={!reason}>Close</Button>
				</Modal.Footer>

			</Modal>
		</div>

	);
}
export default List;
