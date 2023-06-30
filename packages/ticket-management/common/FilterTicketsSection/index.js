import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import Modals from '../Modals';

import FilterType from './FilterType';
import styles from './styles.module.css';
import TicketsSection from './TicketsSection';

function FilterTicketsSection({ type = '' }) {
	const { query: { ticket_id } } = useRouter();

	const [searchParams, setSearchParams] = useState({ text: '', agent: '', category: '' });
	const [modalData, setModalData] = useState({});
	const [isUpdated, setIsUpdated] = useState(false);

	const isAdmin = type === 'admin';

	useEffect(() => {
		if (!isEmpty(ticket_id)) {
			setModalData({ ticketId: ticket_id });
		}
	}, [ticket_id]);

	return (
		<div className={cl`${styles.filter_tickets_container} ${isAdmin ? styles.bridge_gap : ''}`}>
			<FilterType setSearchParams={setSearchParams} searchParams={searchParams} isAdmin={isAdmin} />
			<TicketsSection
				searchParams={searchParams}
				isAdmin={isAdmin}
				setModalData={setModalData}
				isUpdated={isUpdated}
				setIsUpdated={setIsUpdated}
			/>
			<Modals modalData={modalData} setModalData={setModalData} setIsUpdated={setIsUpdated} />
		</div>
	);
}

export default FilterTicketsSection;
