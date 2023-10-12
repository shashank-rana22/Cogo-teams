import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useListTickets from '../../../../hooks/useListTickets';
import useUpdateTicketActivity from '../../../../hooks/useUpdateTicketActivity';
import TicketStructure from '../../../TicketStructure';

import styles from './styles.module.css';

function TicketsSectionPart({
	label = '', status = '', searchParams = {}, spectatorType = '', refreshList = {}, setRefreshList = () => {},
	isAdmin = false, setModalData = () => {}, isUpdated = false, setIsUpdated = () => {}, date = {},
	sortBy = {}, idFilters = {}, setIdFilters = () => {},
}) {
	const { t } = useTranslation(['myTickets']);

	const SECTION_LABEL_MAPPING = {
		Open              : t('myTickets:open_section_label'),
		'Closure Pending' : t('myTickets:closure_pending_section_label'),
		Escalated         : t('myTickets:escalated_section_label'),
		Closed            : t('myTickets:closed_section_label'),
	};

	const {
		tickets = {},
		listLoading = false,
		handleScroll = () => {}, fetchTickets = () => {}, reachedBottom = false,
	} = useListTickets({
		sortBy,
		searchParams,
		spectatorType,
		status,
		date,
		label,
		refreshList,
		setRefreshList,
		isUpdated,
		setIsUpdated,
		idFilters,
		setIdFilters,
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

	const {
		updateTicketActivity = () => {},
		updateLoading = false,
	} = useUpdateTicketActivity({
		refreshTickets,
		fetchTickets,
	});

	return (
		<div className={cl`${styles.tickets_section_part} ${isAdmin ? styles.admin_ticket_view : ''}`}>
			<div className={styles.status_heading}>
				{SECTION_LABEL_MAPPING[label]}
				<div className={styles.tickets_count_label}>{`(${total} ${t('myTickets:tickets')})`}</div>
			</div>
			<TicketStructure
				data={list}
				label={label}
				listLoading={listLoading}
				setModalData={setModalData}
				handleScroll={handleScroll}
				updateLoading={updateLoading}
				updateTicketActivity={updateTicketActivity}
				reachedBottom={reachedBottom}
			/>
		</div>
	);
}

export default TicketsSectionPart;
