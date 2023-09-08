import useListOrganizationTradePartyDetails from '../../hooks/useListOrganizationTradePartyDetails';

import Filter from './Filter';
import ListView from './ListView';

function TradeParties() {
	const {
		typeOfSearch = '', setTypeOfSearch = () => {}, globalSearch = '', setGlobalSearch = () => {},
		filterParams = {}, setFilterParams = () => {}, data = {}, loading = false,
	} = useListOrganizationTradePartyDetails({
		defaultParams  : { organization_trade_parties_data_required: true },
		defaultFilters : { trade_party_type: ['self', 'paying_party', 'collection_party'] },
	});

	return (
		<div>
			<Filter
				typeOfSearch={typeOfSearch}
				setTypeOfSearch={setTypeOfSearch}
				globalSearch={globalSearch}
				setGlobalSearch={setGlobalSearch}
				filterParams={filterParams}
				setFilterParams={setFilterParams}
			/>

			<ListView
				data={data}
				loading={loading}
				filterParams={filterParams}
				setFilterParams={setFilterParams}
			/>
		</div>
	);
}

export default TradeParties;
