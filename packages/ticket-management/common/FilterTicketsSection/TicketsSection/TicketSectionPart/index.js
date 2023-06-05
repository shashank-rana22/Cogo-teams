import { cl } from '@cogoport/components';

import useListTickets from '../../../../hooks/useListTickets';
import TicketStructure from '../../../TicketStructure';

import styles from './styles.module.css';

function TicketsSectionPart({ label, status, searchParams, refreshList, setRefreshList, isAdmin }) {
	const { tickets, listLoading, handleScroll } = useListTickets({
		searchParams,
		status,
		label,
		refreshList,
		setRefreshList,
	});

	const refreshTickets = () => {
		setRefreshList((prev) => {
			const newState = {};
			Object.keys(prev).forEach((key) => {
				newState[key] = true;
			});
			return newState;
		});
	};

	const { list, total = 0 } = tickets;

	return (
		<div className={cl`${styles.tickets_section_part} ${isAdmin ? styles.admin_ticket_view : ''}`}>
			<div className={styles.status_heading}>
				{label}
				<div className={styles.tickets_count_label}>{`(${total} tickets)`}</div>
			</div>
			<TicketStructure
				data={list}
				handleScroll={handleScroll}
				loading={listLoading}
				refreshTickets={refreshTickets}
				label={label}
			/>
		</div>
	);
}

export default TicketsSectionPart;
