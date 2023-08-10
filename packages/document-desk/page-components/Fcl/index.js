import Header from '../../common/Header';
import Loader from '../../common/Loader';
import useListDocumentDesk from '../../hooks/useListDocumentDesk';

import AppliedFilters from './AppliedFilters';
import DeskTabs from './DeskTabs';
import Filters from './Filters';
import ShipmentList from './ShipmentList';
import StepperTabs from './StepperTabs';
import styles from './styles.module.css';

function Fcl() {
	const { data, loading } = useListDocumentDesk();

	return (
		<div>
			<div>
				<Header />

				<div className={styles.filters}>
					<Filters />
				</div>
			</div>

			<AppliedFilters />

			<StepperTabs />

			<DeskTabs />

			{loading
				? <Loader />
				: (
					<ShipmentList
						loading={loading}
						data={data}
					/>
				)}

		</div>
	);
}

export default Fcl;
