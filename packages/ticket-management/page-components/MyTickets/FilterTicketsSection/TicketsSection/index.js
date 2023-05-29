import { useState } from 'react';

import { ticketSectionMapping } from '../../../../constants';

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
				Object.keys(ticketSectionMapping).map((item) => (
					<TicketsSectionPart
						key={item.key}
						{...props}
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
