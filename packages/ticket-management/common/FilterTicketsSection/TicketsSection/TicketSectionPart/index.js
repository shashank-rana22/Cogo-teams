import { cl } from '@cogoport/components';

import useListTickets from '../../../../hooks/useListTickets';
import TicketStructure from '../../../TicketStructure';

import styles from './styles.module.css';

function TicketsSectionPart({ label, status, searchParams, refreshList, setRefreshList, isAdmin, setModalData }) {
	const { tickets, listLoading, handleScroll } = useListTickets({
		searchParams,
		status,
		label,
		refreshList,
		setRefreshList,
	});

	const refreshTickets = () => {
		setRefreshList((prev) => {
			const NEW_STATE = {};
			Object.keys(prev).forEach((key) => {
				NEW_STATE[key] = true;
			});
			return NEW_STATE;
		});
	};

	const { list, total = 0 } = tickets || {};

	return (
		<div className={cl`${styles.tickets_section_part} ${isAdmin ? styles.admin_ticket_view : ''}`}>
			<div className={styles.status_heading}>
				{label}
				<div className={styles.tickets_count_label}>{`(${total} tickets)`}</div>
			</div>
			<TicketStructure
				data={list}
				label={label}
				loading={listLoading}
				setModalData={setModalData}
				handleScroll={handleScroll}
				refreshTickets={refreshTickets}
			/>
		</div>
	);
}

export default TicketsSectionPart;
