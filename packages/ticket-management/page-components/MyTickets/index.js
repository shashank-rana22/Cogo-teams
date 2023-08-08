import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import FilterTicketsSection from '../../common/FilterTicketsSection';
import useRaiseTicket from '../../hooks/useRaiseTicket';

import RaiseTickets from './RaiseTickets';
import StatsSection from './StatsSection';
import styles from './styles.module.css';

function MyTickets() {
	const [additionalInfo, setAdditionalInfo] = useState([]);
	const [showRaiseTicket, setShowRaiseTicket] = useState(false);
	const [spectatorType, setSpectatorType] = useState('reviewer');
	const [refreshList, setRefreshList] = useState({
		Open      : false,
		Pending   : false,
		Escalated : false,
		Closed    : false,
	});

	const { control, handleSubmit, watch, formState: { errors }, reset } = useForm();

	const { raiseTickets, loading } = useRaiseTicket({ setShowRaiseTicket, additionalInfo, setRefreshList });

	const watchOrgId = watch('organization_id');

	const handleClose = () => {
		reset();
		setShowRaiseTicket(false);
	};

	return (
		<div>
			<div className={styles.head}>
				<span className={styles.title}>My Tickets</span>
				<Button onClick={() => setShowRaiseTicket(true)}>Raise Ticket</Button>
			</div>
			<StatsSection spectatorType={spectatorType} />
			<FilterTicketsSection
				refreshList={refreshList}
				setRefreshList={setRefreshList}
				spectatorType={spectatorType}
				setSpectatorType={setSpectatorType}
			/>

			<Modal
				placement="right"
				size="sm"
				show={showRaiseTicket}
				className={styles.styled_ui_modal_dialog}
				closeOnOuterClick={handleClose}
				onClose={handleClose}
			>
				<form onSubmit={handleSubmit(raiseTickets)}>
					<Modal.Header title="Raise Ticket" style={{ padding: 8 }} />

					<Modal.Body className={styles.preview_modal_body}>
						<RaiseTickets
							errors={errors}
							control={control}
							watchOrgId={watchOrgId}
							additionalInfo={additionalInfo}
							setAdditionalInfo={setAdditionalInfo}
						/>
					</Modal.Body>

					<Modal.Footer style={{ padding: 12 }}>
						<Button size="md" type="submit" loading={loading}>
							Submit
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</div>
	);
}

export default MyTickets;
