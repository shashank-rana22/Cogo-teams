import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import FilterTicketsSection from '../../common/FilterTicketsSection';
import useRaiseTicket from '../../hooks/useRaiseTicket';

import RaiseTickets from './RaiseTickets';
import StatsSection from './StatsSection';
import styles from './styles.module.css';

function MyTickets() {
	const [showRaiseTicket, setShowRaiseTicket] = useState(false);
	const { raiseTickets, loading } = useRaiseTicket({ setShowRaiseTicket });

	const { control, handleSubmit, watch, formState: { errors } } = useForm();
	const watchOrgId = watch('organization_id');
	const watchUserId = watch('user_id');

	return (
		<div>
			<div className={styles.head}>
				<span className={styles.title}>My Tickets</span>
				<Button onClick={() => setShowRaiseTicket(true)}>Raise Ticket</Button>
			</div>
			<StatsSection />
			<FilterTicketsSection />

			<Modal
				placement="right"
				size="sm"
				show={showRaiseTicket}
				className={styles.styled_ui_modal_dialog}
				closeOnOuterClick={() => setShowRaiseTicket(false)}
				onClose={() => setShowRaiseTicket(false)}
			>
				<form onSubmit={handleSubmit(raiseTickets)}>
					<Modal.Header title="Raise Ticket" style={{ padding: 8 }} />
					<Modal.Body className={styles.preview_modal_body}>
						<RaiseTickets
							control={control}
							errors={errors}
							watchOrgId={watchOrgId}
							watchUserId={watchUserId}
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
