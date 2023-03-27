import Loader from '../../commons/Loader';

import List from './components/List';
import ScopeAndFilters from './components/ScopeAndFilters';
import TabsAndFilters from './components/TabsAndFilters';
import useListBookingDeskShipments from './hooks/useListBookingDeskShipments';
import styles from './styles.module.css';

export default function FCLDesk({ stateProps = {} }) {
	const { loading, data } = useListBookingDeskShipments({ stateProps });

	return (
		<div>
			<div className={styles.header}>
				<h1>Booking Desk</h1>

				<ScopeAndFilters stateProps={stateProps} />
			</div>

			<TabsAndFilters stateProps={stateProps} />

			<div className={`${styles.list_container} ${loading ? styles.loading : ''}`}>
				{loading ? <Loader /> : <List data={data} stateProps={stateProps} />}
			</div>
		</div>
	);
}
