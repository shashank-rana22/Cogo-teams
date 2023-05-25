import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useUpdateTicketActivity from '../../../../../../../hooks/useUpdateTicketActivity';

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
	listType = '',
}) {
	// const {
	// 	refreshTickets,
	// 	setModalData,
	// 	listType = '',
	// } = props;
	const { updateTicketActivity } = useUpdateTicketActivity({
		refreshTickets,
	});

	if (isEmpty(data) && !loading) {
		return (
			<EmptyStateTicketStructure
				setModalData={setModalData}
				listType={listType}
			/>
		);
	}

	return (
		<div
			className={cl`${
				listType === 'create' ? styles.raised_box : styles.ticket_box
			}`}
			onScroll={(e) => handleScroll(
				e.target.clientHeight,
				e.target.scrollTop,
				e.target.scrollHeight,
			)}
		>
			{/* {
				data.map((item) => (
					<TicketStructureBody
						data={item}
						key={item.id}
						updateTicketActivity={updateTicketActivity}
						setModalData={setModalData}

					/>
				))
			} */}

			{!(listType === 'create' && loading)
				&& data.map((item = {}) => (
					<TicketStructureBody
						data={item}
						key={item.id}
						updateTicketActivity={updateTicketActivity}
						setModalData={setModalData}
						listType={listType}
					/>
				))}

			{loading && (
				<TicketStructureLoader listType={listType} />
			)}
		</div>
	);
}

export default TicketStructure;
