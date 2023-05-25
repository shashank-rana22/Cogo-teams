import TicketStructure from '../../../../../common/TicketStructure';

import styles from './styles.module.css';

function TicketsSectionPart({
	label, data, handleScroll, loading, refreshTickets,
	setModalData = () => {},
}) {
	const { list, total } = data;
	return (
		<div className={styles.tickets_section_part}>
			<div className={styles.status_heading}>
				{`${label} (${total} tickets)`}
			</div>
			<TicketStructure
				data={list}
				handleScroll={handleScroll}
				loading={loading}
				refreshTickets={refreshTickets}
				setModalData={setModalData}
			/>
		</div>
	);
}

export default TicketsSectionPart;
