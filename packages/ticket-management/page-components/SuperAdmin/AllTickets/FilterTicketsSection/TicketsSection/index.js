import { useState } from 'react';

import useListTickets from '../../../../../hooks/useListTickets';

import styles from './styles.module.css';
import TicketsSectionPart from './TicketSectionPart';

function TicketsSection({ searchText, setModalData = () => {} }) {
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
		handleScroll:handleOpenTicketScroll, refreshTickets:openRefreshTickets,
	} =	useListTickets(
		searchText,
		mapping.Open,
		setTicketList,
		'Open',
	);
	const {
		listLoading:pendingTicketsLoading,
		handleScroll:handlePendingTicketScroll, refreshTickets:pendingRefreshTickets,
	} =	useListTickets(
		searchText,
		mapping.Pending,
		setTicketList,
		'Pending',
	);
	const {
		listLoading:escalatedTicketsLoading,
		handleScroll:handleEscalatedTicketScroll, refreshTickets:escalatedRefreshTickets,
	} =	useListTickets(
		searchText,
		mapping.Escalated,
		setTicketList,
		'Escalated',
	);
	const {
		listLoading:closedTicketsLoading,
		handleScroll:handleClosedTicketScroll, refreshTickets:closedRefreshTickets,
	} =	useListTickets(
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
				refreshTickets={openRefreshTickets}
				setModalData={setModalData}
			/>
			<TicketsSectionPart
				label="Pending"
				data={ticketList.Pending}
				loading={pendingTicketsLoading}
				handleScroll={handlePendingTicketScroll}
				refreshTickets={pendingRefreshTickets}
				setModalData={setModalData}
			/>
			<TicketsSectionPart
				label="Escalated"
				data={ticketList.Escalated}
				loading={escalatedTicketsLoading}
				handleScroll={handleEscalatedTicketScroll}
				refreshTickets={escalatedRefreshTickets}
				setModalData={setModalData}
			/>
			<TicketsSectionPart
				label="Closed"
				data={ticketList.Closed}
				loading={closedTicketsLoading}
				handleScroll={handleClosedTicketScroll}
				refreshTickets={closedRefreshTickets}
				setModalData={setModalData}
			/>
		</div>
	);
}

export default TicketsSection;
