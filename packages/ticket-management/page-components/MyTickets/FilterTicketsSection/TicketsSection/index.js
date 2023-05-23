import { useState } from 'react';

import useListTickets from '../../../../hooks/useListTickets';

import styles from './styles.module.css';
import TicketsSectionPart from './TicketSectionPart';

function TicketsSection({ searchText }) {
	const mapping = {
		Open      : 'unresolved',
		Pending   : 'pending',
		Escalated : 'escalated',
		Closed    : 'closed',
	};
	const [ticketList, setTicketList] = useState({ Open: [], Pending: [], Escalated: [], Closed: [] });

	const { listLoading:openTicketsLoading, handleScroll:handleOpenTicketScroll } =	useListTickets(
		searchText,
		mapping.Open,
		setTicketList,
		'Open',
	);
	const { listLoading:pendingTicketsLoading, handleScroll:handlePendingTicketScroll } =	useListTickets(
		searchText,
		mapping.Pending,
		setTicketList,
		'Pending',
	);
	const { listLoading:escalatedTicketsLoading, handleScroll:handleEscalatedTicketScroll } =	useListTickets(
		searchText,
		mapping.Escalated,
		setTicketList,
		'Escalated',
	);
	const { listLoading:closedTicketsLoading, handleScroll:handleClosedTicketScroll } =	useListTickets(
		searchText,
		mapping.Closed,
		setTicketList,
		'Closed',
	);

	return (
		<div className={styles.tickets_section}>
			<TicketsSectionPart
				label="Open"
				data={ticketList.Open}
				loading={openTicketsLoading}
				handleScroll={handleOpenTicketScroll}
			/>
			<TicketsSectionPart
				label="Pending"
				data={ticketList.Pending}
				loading={pendingTicketsLoading}
				handleScroll={handlePendingTicketScroll}
			/>
			<TicketsSectionPart
				label="Escalated"
				data={ticketList.Escalated}
				loading={escalatedTicketsLoading}
				handleScroll={handleEscalatedTicketScroll}
			/>
			<TicketsSectionPart
				label="Closed"
				data={ticketList.Closed}
				loading={closedTicketsLoading}
				handleScroll={handleClosedTicketScroll}
			/>
		</div>
	);
}

export default TicketsSection;
