import { isEmpty } from '@cogoport/utils';

import useUpdateTicketActivity from '../../hooks/useUpdateTicketActivity';
import EmptyTicket from '../EmptyTicket';

import styles from './styles.module.css';
import TicketStructureBody from './TicketStructureBody';
import TicketStructureLoader from './TicketStructureLoader';

function TicketStructure({
	data = [],
	handleScroll = () => {},
	loading = false,
	refreshTickets = () => {},
	setModalData = () => {},
	label,
}) {
	const { updateTicketActivity } = useUpdateTicketActivity({
		refreshTickets,
	});

	if (isEmpty(data) && !loading) return <EmptyTicket emptyText={`No ${label} Tickets`} />;

	return (
		<div
			className={styles.ticket_box}
			onScroll={(e) => handleScroll(
				{
					clientHeight :	e.target.clientHeight,
					scrollTop    :	e.target.scrollTop,
					scrollHeight :	e.target.scrollHeight,
				},
			)}
		>
			{
				data.map((item = {}) => (
					<TicketStructureBody
						data={item}
						key={item.id}
						label={label}
						setModalData={setModalData}
						updateTicketActivity={updateTicketActivity}
					/>
				))
			}

			{loading && (
				<TicketStructureLoader />
			)}
		</div>
	);
}

export default TicketStructure;
