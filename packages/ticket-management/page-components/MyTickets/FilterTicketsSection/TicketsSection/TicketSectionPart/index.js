import TicketStructure from '../../../../../common/TicketStructure';

import styles from './styles.module.css';

function TicketsSectionPart({ label, data, handleScroll, loading, refreshTickets }) {
	const { list, total } = data;

	// const {
	// 	listLoading:closedTicketsLoading,
	// 	handleScroll:handleClosedTicketScroll,
	// 	refreshTickets:closedRefreshTickets,
	// } =	useListTickets(
	// 	searchParams,
	// 	mapping.Closed,
	// 	setTicketList,
	// 	Type:label,
	// );
	return (
		<div className={styles.tickets_section_part}>
			<div className={styles.status_heading}>
				{label}
				<div className={styles.tickets_count_label}>{`(${total} tickets)`}</div>
			</div>
			<TicketStructure
				data={list}
				handleScroll={handleScroll}
				loading={loading}
				refreshTickets={refreshTickets}
			/>
		</div>
	);
}

export default TicketsSectionPart;
