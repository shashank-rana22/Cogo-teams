// import { isEmpty } from '@cogoport/front/utils';
// import { cl } from '@cogoport/components';

// import useUpdateTicketActivity from '../../hooks/useUpdateTicketActivity';
import styles from './styles.module.css';
import TicketStructureBody from './TicketStructureBody';
// import TicketStructureLoader from './TicketStructureLoader';
// import EmptyStateTicketStructure from './EmptyStateTicketStructure';

function TicketStructure() {
	// const {
	// 	ticketData,
	// 	refreshTickets,
	// 	listLoading,
	// 	handleScroll = () => {},
	// 	setModalData,
	// 	listType = '',
	// } = props;
	// const { updateTicketActivity } = useUpdateTicketActivity({
	// 	refreshTickets,
	// });

	// if (isEmpty(ticketData) && !listLoading) {
	// 	return (
	// 		<EmptyStateTicketStructure
	// 			setModalData={setModalData}
	// 			listType={listType}
	// 		/>
	// 	);
	// }

	return (
		<div
			// className={cl`${
			// 	listType === 'create' ? styles.raised_box : styles.ticket_box
			// }`}
			className={styles.ticket_box}
			// onScroll={(e) => handleScroll(
			// 	e.target.clientHeight,
			// 	e.target.scrollTop,
			// 	e.target.scrollHeight,
			// )}
		>

			<TicketStructureBody />

			{/* {listLoading && <TicketStructureLoader listType={listType} />} */}
		</div>
	);
}

export default TicketStructure;
