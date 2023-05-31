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
			<div className={styles.header}>
				<h1>Document Desk</h1>

				<Filters />
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
