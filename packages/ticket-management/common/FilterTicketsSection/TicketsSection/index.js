import { useState } from 'react';

import { TICKET_SECTION_MAPPING } from '../../../constants';

import styles from './styles.module.css';
import TicketsSectionPart from './TicketSectionPart';

function TicketsSection(props) {
	const [refreshList, setRefreshList] = useState({
		Open      : false,
		Pending   : false,
		Escalated : false,
		Closed    : false,
	});

	return (
		<div className={styles.tickets_section}>
			{
				Object.keys(TICKET_SECTION_MAPPING).map((item) => (
					<TicketsSectionPart
						{...props}
						key={item.key}
						label={item}
						status={item}
						refreshList={refreshList}
						setRefreshList={setRefreshList}
					/>
				))
			}
		</div>
	);
}

export default TicketsSection;
