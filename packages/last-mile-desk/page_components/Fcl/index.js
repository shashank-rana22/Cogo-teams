import AppliedFilters from './AppliedFilters';
import DeskTabs from './DeskTabs';
import Filters from './Filters';
import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function Fcl({ stateProps = {} }) {
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
			<ShipmentList stateProps={stateProps} />
		</div>
	);
}
export default Fcl;
