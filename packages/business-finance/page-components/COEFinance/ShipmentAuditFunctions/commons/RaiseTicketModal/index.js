import { Modal, Button, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { upperCase } from '@cogoport/utils';
import { useState } from 'react';

import Layout from '../../../../commons/Layout/index';
import useGetConfigurationCategory from '../../../hook/useGetConfigurationCategory';
import useListShipment from '../../../hook/useListShipment';
import useListStakeholders from '../../../hook/useListShipmentStakeholders';
import useRaiseTicket from '../../../hook/useRaiseTicket';
import getStakeholderData from '../../../utils/getStakeholderData';
import controls from '../../configurations/raise-ticket-controls';

import styles from './styles.module.css';

const SHIPMENT_TYPES = GLOBAL_CONSTANTS.shipment_types;

function RaiseTicketModal({
	setShowTicketModal = () => {},
	showTicketModal = false,
	shipment_id = '',
	itemData = {},
	id = '',
}) {
	const [additionalInfo, setAdditionalInfo] = useState([]);

	let disableButton = false;

	const {
		control = {}, watch = () => {},
		handleSubmit = () => {}, formState:{ errors = {} } = {},
	} = useForm();

	const formValues = watch();

	const watchRaisedToDesk = watch('raised_to_desk');

	const { data = {}, loading:shipmentLoading = false } = useListShipment(id);

	const shipmentData = data?.list?.[GLOBAL_CONSTANTS.zeroth_index];

	const service = (SHIPMENT_TYPES || []).find((item) => item?.value === itemData?.serviceType);

	const {
		data:stakeholderData = [],
		loading:stakeholderLoading = false,
	} = useListStakeholders({ shipmentId: shipment_id });

	const { raiseTickets = () => {}, loading = false } = useRaiseTicket({
		setShowTicketModal,
		additionalInfo,
		shipmentData,
		service,
		source: 'audit_function',
	});

	const { data:configData = {} } = useGetConfigurationCategory(shipmentData);

	const raiseToDesk = configData?.items?.[GLOBAL_CONSTANTS.zeroth_index]?.raised_to_desk;

	const formatRaiseToDeskOptions = (raiseToDesk || [])?.map((item) => ({
		label : item?.name,
		value : item?.name,
	}));

	const STAKEHOLDER_OPTIONS = getStakeholderData(stakeholderData) || {};

	const fields = controls({
		formatRaiseToDeskOptions,
		watchRaisedToDesk,
		setAdditionalInfo,
		shipmentData,
		STAKEHOLDER_OPTIONS,
	});

	(fields || []).forEach((item) => {
		if (item?.rules?.required && !formValues[item?.name]) {
			disableButton = true;
		}
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

								{`#${id}`}
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
				<Button
					size="md"
					disabled={loading || shipmentLoading || stakeholderLoading || disableButton}
					onClick={handleSubmit(raiseTickets)}
				>
					Submit
				</Button>

			</Modal.Footer>

		</Modal>
	);
}

export default RaiseTicketModal;
