import { isEmpty } from '@cogoport/utils';

import EmptyTicket from '../EmptyTicket';

import styles from './styles.module.css';
import TicketStructureBody from './TicketStructureBody';

function TicketStructure({
	data = [],
	handleScroll = () => {},
	setModalData = () => {},
	label = '',
	updateTicketActivity = () => {},
}) {
	if (isEmpty(data)) {
		return <EmptyTicket emptyText={`No ${label} Tickets`} />;
	}

	return (
		<div
			className={styles.ticket_box}
			onScroll={(e) => handleScroll(
				{
					clientHeight :	e.target.clientHeight,
					scrollTop    :	e.target.scrollTop,
					scrollHeight :	e.target.scrollHeight,
				},
			)}
		>
			{
				(data || []).map((item = {}) => (
					<TicketStructureBody
						data={item}
						key={item.id}
						label={label}
						setModalData={setModalData}
						updateTicketActivity={updateTicketActivity}
					/>
				))
			}
		</div>
	);
}

export default TicketStructure;
