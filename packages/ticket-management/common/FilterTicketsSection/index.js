import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import Modals from '../Modals';

import FilterType from './FilterType';
import styles from './styles.module.css';
import TicketsSection from './TicketsSection';

function FilterTicketsSection({
	type = '', setRefreshList =	() => {}, refreshList = {}, spectatorType = '',
	setSpectatorType =	() => {}, date = {},
}) {
	const { query: { ticket_id } } = useRouter();

	const [showReassign, setShowReassign] = useState(false);
	const [searchParams, setSearchParams] = useState({ text: '', agent: '', category: '' });
	const [modalData, setModalData] = useState(ticket_id ? { ticketId: ticket_id } : {});
	const [isUpdated, setIsUpdated] = useState(false);

	const isAdmin = type === 'admin';

	return (
		<div className={cl`${styles.filter_tickets_container} ${isAdmin ? styles.bridge_gap : ''}`}>
			<FilterType
				setSearchParams={setSearchParams}
				searchParams={searchParams}
				isAdmin={isAdmin}
				spectatorType={spectatorType}
				setSpectatorType={setSpectatorType}
			/>
			<TicketsSection
				date={date}
				searchParams={searchParams}
				spectatorType={spectatorType}
				isAdmin={isAdmin}
				setModalData={setModalData}
				isUpdated={isUpdated}
				setIsUpdated={setIsUpdated}
				setRefreshList={setRefreshList}
				refreshList={refreshList}
			/>
			<Modals
				modalData={modalData}
				setModalData={setModalData}
				setIsUpdated={setIsUpdated}
				showReassign={showReassign}
				setShowReassign={setShowReassign}
			/>

		</div>
	);
}

export default FilterTicketsSection;
