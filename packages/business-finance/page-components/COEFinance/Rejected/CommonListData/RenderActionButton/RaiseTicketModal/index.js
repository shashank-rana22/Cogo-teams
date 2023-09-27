import { Modal, Button, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { upperCase } from '@cogoport/utils';
import { useState } from 'react';

import Layout from '../../../../../commons/Layout/index.tsx';
import controls from '../../../../configurations/raise-ticket-controls';
import useGetConfigurationCategory from '../../../../hook/useGetConfigurationCategory';
import useListShipment from '../../../../hook/useListShipment.ts';
import useRaiseTicket from '../../../../hook/useRaiseTicket';

import styles from './styles.module.css';

const SHIPMENT_TYPES = GLOBAL_CONSTANTS.shipment_types;

function RaiseTicketModal({
	setShowTicketModal = () => {},
	showTicketModal = false,
	itemData = {},
	refetch = () => {},
}) {
	const [additionalInfo, setAdditionalInfo] = useState([]);

	const { control, watch, handleSubmit, formState:{ errors = {} } = {} } = useForm();

	const watchRaisedToDesk = watch('raised_to_desk');

	const { raiseTickets = () => {}, loading = false } = useRaiseTicket({
		onClose: setShowTicketModal,
		additionalInfo,
		refetch,
	});

	const { data } = useListShipment(itemData?.jobNumber);

	const shipmentData = data?.list[GLOBAL_CONSTANTS.zeroth_index];

	const { data:configData = {} } = useGetConfigurationCategory(shipmentData);

	const raiseToDesk = configData?.items?.[GLOBAL_CONSTANTS.zeroth_index]?.raised_to_desk;

	const service = (SHIPMENT_TYPES || []).find((item) => item?.value === shipmentData?.shipment_type);

	const formatRaiseToDeskOptions = (raiseToDesk || []).map((item) => ({
		label : item?.name,
		value : item?.name,
	}));

	const fields = controls({
		formatRaiseToDeskOptions,
		watchRaisedToDesk,
		setAdditionalInfo,
		shipmentData,
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
						<div className={styles.title}>
							Requested Type
						</div>
						<div className={styles.label}>
							Shipment
						</div>
					</div>
					<div className={styles.sid_container}>
						<div className={styles.title}>
							SID
						</div>
						<div className={styles.pill_container}>
							<div className={styles.label}>

								{`#${itemData?.jobNumber}`}
							</div>
							<div className={styles.pill}>
								<Pill size="md" color="#D9EAFD">{service?.label}</Pill>
							</div>
							<div className={styles.pill}>
								<Pill size="md" color="#FCEDBF">{upperCase(shipmentData?.trade_type)}</Pill>

							</div>
						</div>

					</div>
					<div className={styles.hr} />
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
