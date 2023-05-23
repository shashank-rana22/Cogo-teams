import TicketStructure from '../../../../../common/TicketStructure';

import styles from './styles.module.css';

function TicketsSectionPart() {
	return (
		<div className={styles.tickets_section_part}>
			<div className={styles.status_heading}>Open</div>
			<TicketStructure />
		</div>
	);
}

export default TicketsSectionPart;
