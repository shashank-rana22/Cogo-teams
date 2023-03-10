import CrmTable from './ListView/components/CrmTable';
import EnrichmentRequest from './ListView/components/EnrichmentRequest';
import Filters from './ListView/components/Filters';
import Header from './ListView/components/Header';
import PrimaryTabs from './ListView/components/PrimaryTabs';
import Statistics from './ListView/components/Statistics';

function CrmFeedback() {
	return (
		<>
			<Header />
			<PrimaryTabs />
			{/* <Filters filters={filters} onChangeFilters={onChangeFilters} /> */}
			<Filters />
			<Statistics />
			<EnrichmentRequest />
			<CrmTable />
		</>

	);
}

export default CrmFeedback;
