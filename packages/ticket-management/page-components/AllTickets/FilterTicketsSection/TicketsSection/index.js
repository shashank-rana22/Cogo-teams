import styles from './styles.module.css';
import TicketsSectionPart from './TicketSectionPart';

function TicketsSection() {
	return (
		<div className={styles.tickets_section}>
			<TicketsSectionPart />
			<TicketsSectionPart />
			<TicketsSectionPart />
			<TicketsSectionPart />
		</div>
	);
}

export default TicketsSection;
