import { TICKET_SECTION_MAPPING } from '../../../constants';

import styles from './styles.module.css';
import TicketsSectionPart from './TicketSectionPart';

function TicketsSection(props) {
	return (
		<div className={styles.tickets_section}>
			{
				Object.keys(TICKET_SECTION_MAPPING).map((item) => (
					<TicketsSectionPart
						{...props}
						key={item.key}
						label={item}
						status={item}
					/>
				))
			}
		</div>
	);
}

export default TicketsSection;
