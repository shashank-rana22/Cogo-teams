import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyTicket from '../../../../../../../common/EmptyTicket';
import TicketStructureLoader from '../../../../../../../common/TicketStructureLoader';
import useUpdateTicketActivity from '../../../../../../../hooks/useUpdateTicketActivity';

import styles from './styles.module.css';
import TicketStructureBody from './TicketStructureBody';

function TicketStructure({
	data = [],
	handleScroll = () => {},
	loading = false,
	refreshTickets = () => {},
	setModalData = () => {},
	listType = '',
}) {
	const { updateTicketActivity } = useUpdateTicketActivity({
		refreshTickets,
	});

	if (isEmpty(data) && !loading) {
		return (
			<EmptyTicket
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
