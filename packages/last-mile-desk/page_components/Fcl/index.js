import Loader from '../../commons/Loader';
import useListLastMileDeskShipments from '../../hooks/useListLastMileDeskShipments';

import AppliedFilters from './AppliedFilters';
import DeskTabs from './DeskTabs';
import Filters from './Filters';
import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function Fcl({ stateProps = {} }) {
	const { data, loading } = useListLastMileDeskShipments({ stateProps });

	return (
		<div>
			<div className={styles.header}>
				<h1>Last Mile Desk</h1>

				<div>
					<Filters stateProps={stateProps} />
				</div>
			</div>

			<AppliedFilters stateProps={stateProps} />

			<DeskTabs stateProps={stateProps} />

			{loading
				? <Loader />
				: (
					<ShipmentList
						stateProps={stateProps}
						loading={loading}
						data={data}
					/>
				)}

		</div>
	);
}
export default Fcl;
