import AppliedFilters from './AppliedFilters';
import DeskTabs from './DeskTabs';
import Filters from './Filters';
import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function Fcl() {
	return (
		<div>
			<div className={styles.header}>
				<h1>Last Mile Desk</h1>

				<Filters />
			</div>

			<AppliedFilters />

			<DeskTabs />

			<ShipmentList />

		</div>
	);
}
export default Fcl;
