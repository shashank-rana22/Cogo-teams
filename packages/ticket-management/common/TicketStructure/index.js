import { isEmpty } from '@cogoport/utils';

import EmptyTicket from '../EmptyTicket';

import styles from './styles.module.css';
import TicketStructureBody from './TicketStructureBody';
import TicketStructureLoader from './TicketStructureLoader';

function TicketStructure({
	data = [],
	handleScroll = () => {},
	setModalData = () => {},
	label = '',
	updateTicketActivity = () => {},
	listLoading = false,
	reachedBottom = false,
}) {
	if (!listLoading && isEmpty(data)) {
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

			{reachedBottom && (
				<div className={styles.footer_no_data}>
					No more tickets are available
				</div>
			)}

			{listLoading && !reachedBottom && <TicketStructureLoader />}
		</div>
	);
}

export default TicketStructure;
