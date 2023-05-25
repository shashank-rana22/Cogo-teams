import { isEmpty } from '@cogoport/utils';

import useUpdateTicketActivity from '../../hooks/useUpdateTicketActivity';

import EmptyStateTicketStructure from './EmptyStateTicketStructure';
import styles from './styles.module.css';
import TicketStructureBody from './TicketStructureBody';
import TicketStructureLoader from './TicketStructureLoader';

function TicketStructure({
	data = [],
	handleScroll = () => {},
	loading = false,
	refreshTickets = () => {},
	setModalData = () => {},
}) {
	const { updateTicketActivity } = useUpdateTicketActivity({
		refreshTickets,
	});

	if (isEmpty(data) && !loading) {
		return (
			<EmptyStateTicketStructure
				setModalData={setModalData}
			/>
		);
	}

	return (
		<div
			className={styles.ticket_box}
			onScroll={(e) => handleScroll(
				e.target.clientHeight,
				e.target.scrollTop,
				e.target.scrollHeight,
			)}
		>
			{
				data.map((item = {}) => (
					<TicketStructureBody
						data={item}
						key={item.id}
						updateTicketActivity={updateTicketActivity}

					/>
				))
			}

			{loading && (
				<TicketStructureLoader />
			)}
		</div>
	);
}

export default TicketStructure;
