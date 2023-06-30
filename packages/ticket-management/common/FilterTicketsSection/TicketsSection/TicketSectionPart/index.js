import { cl } from '@cogoport/components';

import useListTickets from '../../../../hooks/useListTickets';
import useUpdateTicketActivity from '../../../../hooks/useUpdateTicketActivity';
import TicketStructure from '../../../TicketStructure';

import styles from './styles.module.css';

function TicketsSectionPart({
	label, status, searchParams, refreshList, setRefreshList, isAdmin, setModalData, updated,
}) {
	const { tickets, listLoading, handleScroll, fetchTickets = () => {} } = useListTickets({
		searchParams,
		status,
		label,
		refreshList,
		setRefreshList,
		updated,
	});

	const { list, total = 0 } = tickets || {};

	const refreshTickets = () => {
		setRefreshList((prev) => {
			const NEW_STATE = {};
			Object.keys(prev).forEach((key) => {
				NEW_STATE[key] = true;
			});
			return NEW_STATE;
		});
	};

	const { updateTicketActivity } = useUpdateTicketActivity({
		refreshTickets,
		fetchTickets,
	});

	return (
		<div className={cl`${styles.tickets_section_part} ${isAdmin ? styles.admin_ticket_view : ''}`}>
			<div className={styles.status_heading}>
				{label}
				<div className={styles.tickets_count_label}>{`(${total} tickets)`}</div>
			</div>
			<TicketStructure
				data={list}
				label={label}
				listLoading={listLoading}
				setModalData={setModalData}
				handleScroll={handleScroll}
				updateTicketActivity={updateTicketActivity}
			/>
		</div>
	);
}

export default TicketsSectionPart;
