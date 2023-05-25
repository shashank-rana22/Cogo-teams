import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import Header from '../../common/Header';

import FilterTicketsSection from './FilterTicketsSection';
import Modals from './Modals';
import StatsSection from './StatsSection';

// import styles from './styles.module.css';

function getDefaultValues(query) {
	const { showticketslist = false, ticketId = '' } = query;

	if (showticketslist) {
		return { type: 'tickets_list' };
	}

	if (ticketId) {
		return { type: 'ticket_details', ticketId };
	}

	return null;
}

function MyTickets() {
	const { query } = useSelector(({ profile, general }) => ({
		agent : profile.partner?.entity_manager,
		query : general?.query,
	}));
	const [modalData, setModalData] = useState(getDefaultValues(query));

	return (
		<>
			<div>
				<Header />
				<StatsSection />
				<FilterTicketsSection />
			</div>
			<Modals modalData={modalData} setModalData={setModalData} />
		</>
	);
}

export default MyTickets;
