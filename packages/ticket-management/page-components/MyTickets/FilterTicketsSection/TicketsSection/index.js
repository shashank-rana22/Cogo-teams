import { useState } from 'react';

import useListTickets from '../../../../hooks/useListTickets';

import styles from './styles.module.css';
import TicketsSectionPart from './TicketSectionPart';

function TicketsSection({ searchParams }) {
	const mapping = {
		Open      : 'unresolved',
		Pending   : 'pending',
		Escalated : 'escalated',
		Closed    : 'closed',
	};
	const [ticketList, setTicketList] = useState({
		Open      : [],
		Pending   : [],
		Escalated : [],
		Closed    : [],
		Total     : {
			Open: 0, Pending: 0, Escalated: 0, Closed: 0,
		},
	});

	const {
		listLoading:openTicketsLoading,
		handleScroll:handleOpenTicketScroll,
		refreshTickets:openRefreshTickets,
	} =	useListTickets(
		searchParams,
		mapping.Open,
		setTicketList,
		'Open',
	);
	const {
		listLoading:pendingTicketsLoading,
		handleScroll:handlePendingTicketScroll,
		refreshTickets:pendingRefreshTickets,
	} =	useListTickets(
		searchParams,
		mapping.Pending,
		setTicketList,
		'Pending',
	);
	const {
		listLoading:escalatedTicketsLoading,
		handleScroll:handleEscalatedTicketScroll,
		refreshTickets:escalatedRefreshTickets,
	} =	useListTickets(
		searchParams,
		mapping.Escalated,
		setTicketList,
		'Escalated',
	);
	const {
		listLoading:closedTicketsLoading,
		handleScroll:handleClosedTicketScroll,
		refreshTickets:closedRefreshTickets,
	} =	useListTickets(
		searchParams,
		mapping.Closed,
		setTicketList,
		'Closed',
	);

	const refreshAll = () => {
		openRefreshTickets();
		pendingRefreshTickets();
		escalatedRefreshTickets();
		closedRefreshTickets();
	};

	return (
		<div className={styles.tickets_section}>
			<TicketsSectionPart
				label="Open"
				data={ticketList.Open}
				loading={openTicketsLoading}
				handleScroll={handleOpenTicketScroll}
				refreshTickets={refreshAll}
			/>
			<TicketsSectionPart
				label="Pending"
				data={ticketList.Pending}
				loading={pendingTicketsLoading}
				handleScroll={handlePendingTicketScroll}
				refreshTickets={refreshAll}
			/>
			<TicketsSectionPart
				label="Escalated"
				data={ticketList.Escalated}
				loading={escalatedTicketsLoading}
				handleScroll={handleEscalatedTicketScroll}
				refreshTickets={refreshAll}
			/>
			<TicketsSectionPart
				label="Closed"
				data={ticketList.Closed}
				loading={closedTicketsLoading}
				handleScroll={handleClosedTicketScroll}
				refreshTickets={refreshAll}
			/>
		</div>
	);
}

export default TicketsSection;
