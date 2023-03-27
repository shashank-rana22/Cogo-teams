import Loader from '../../commons/Loader';
import useListBookingDeskShipments from '../../hooks/FCL-Local/useListBookingDeskShipments';

import List from './List';
import ScopeAndFilters from './ScopeAndFilters';
import styles from './styles.module.css';
import TabsAndFilters from './TabsAndFilters';

export default function FCLLocalDesk({ stateProps = {} }) {
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
