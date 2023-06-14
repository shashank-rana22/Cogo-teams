import { useContext } from 'react';

import BookingDeskContext from '../../context/BookingDeskContext';
import useListBookingDeskShipments from '../../hooks/useListBookingDeskShipments';
import Loader from '../Loader';

import List from './List';
import styles from './styles.module.css';

export default function RenderList({ tabs = [], Card, apiPrefix = '' }) {
	const { tabState: { activeTab } = {} } = useContext(BookingDeskContext) || {};

	const { loading, data } = useListBookingDeskShipments({ prefix: apiPrefix });

	const couldBeCardsCritical = !!tabs.find(
		(tab) => tab.name === activeTab,
	)?.isCriticalVisible;

	return (
		<div
			className={`${styles.list_container} ${loading ? styles.loading : ''}`}
		>
			{loading ? (
				<Loader />
			) : (
				<List
					data={data}
					Card={Card}
					couldBeCardsCritical={couldBeCardsCritical}
				/>
			)}
		</div>
	);
}
