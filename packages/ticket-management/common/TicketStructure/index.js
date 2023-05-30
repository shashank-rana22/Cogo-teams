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
	label,
}) {
	const { updateTicketActivity } = useUpdateTicketActivity({
		refreshTickets,
	});

	if (isEmpty(data) && !loading) {
		return (
			<EmptyStateTicketStructure label={label} />
		);
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
