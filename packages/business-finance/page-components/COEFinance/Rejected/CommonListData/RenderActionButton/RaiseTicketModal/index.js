import { Modal, Button, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import Layout from '../../../../../commons/Layout/index.tsx';
import controls from '../../../../configurations/raise-ticket-controls';
import useListShipment from '../../../../hook/useListShipment.ts';
import useRaiseTicket from '../../../../hook/useRaiseTicket';

import styles from './styles.module.css';

function RaiseTicketModal({
	setShowTicketModal = () => {},
	showTicketModal = false,
	itemData = {},
}) {
	const [raiseToDesk, setRaiseToDesk] = useState([]);
	const [additionalInfo, setAdditionalInfo] = useState([]);

	const { control, watch, handleSubmit, formState:{ errors = {} } = {} } = useForm();

	const formValues = watch();

	const { raiseTickets = () => {}, loading = false } = useRaiseTicket({
		onClose: setShowTicketModal,
		additionalInfo,
	});

	const { data } = useListShipment(itemData?.jobNumber);

	const shipmentData = data?.list[GLOBAL_CONSTANTS.zeroth_index];

	const formatRaiseToDeskOptions = (raiseToDesk || []).map((item) => ({
		label : item?.name,
		value : item?.name,
	}));

	const fields = controls({
		setRaiseToDesk,
		formatRaiseToDeskOptions,
		formValues,
		setAdditionalInfo,
	});

	return (
		<Modal
			size="sm"
			placement="right"
			onClose={() => setShowTicketModal(false)}
			show={showTicketModal}
			closeOnOuterClick={() => setShowTicketModal(false)}
			className={styles.styled_ui_modal_dialog}
		>
			<Modal.Header title="Raise Ticket" style={{ padding: 8 }} />

			<Modal.Body>
				<>
					<div>
						<div>
							Requested Type
						</div>
						<div>
							Shipment
						</div>
					</div>
					<div>

						<div>
							SID
						</div>
						<div className={styles.pill_container}>
							<div>
								{`#${itemData?.jobNumber}`}
							</div>
							<div className={styles.pill}>
								<Pill size="md" color="green">AIR</Pill>
							</div>
							<div className={styles.pill}>
								<Pill size="md" color="green">{shipmentData?.trade_type}</Pill>

							</div>
						</div>

					</div>
					<Layout
						fields={fields}
						control={control}
						errors={errors}
					/>
				</>
			</Modal.Body>

			<Modal.Footer style={{ padding: 12 }}>
				<Button size="md" disabled={loading} onClick={handleSubmit(raiseTickets)}>
					Submit
				</Button>

			</Modal.Footer>

		</Modal>
	);
}

export default RaiseTicketModal;
