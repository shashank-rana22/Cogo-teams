import { useState } from 'react';

import styles from './styles.module.css';
import TicketsSectionPart from './TicketSectionPart';

function TicketsSection(props) {
	const mapping = {
		Open      : 'unresolved',
		Pending   : 'pending',
		Escalated : 'escalated',
		Closed    : 'closed',
	};

	const [refreshList, setRefreshList] = useState({
		Open      : false,
		Pending   : false,
		Escalated : false,
		Closed    : false,
	});

	return (
		<div className={styles.tickets_section}>
			{
				Object.keys(mapping).map((item) => (
					<TicketsSectionPart
						key={item}
						{...props}
						label={item}
						status={mapping[item]}
						refreshList={refreshList}
						setRefreshList={setRefreshList}
					/>
				))
			}
		</div>
	);
}

export default TicketsSection;
