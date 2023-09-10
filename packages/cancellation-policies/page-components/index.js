import useListShipmentCancellationCharges from '../hooks/useListShipmentCancellationCharges';

import Header from './Header';
import ListingArea from './ListingArea';
import ListPagination from './ListPagination';
import styles from './styles.module.css';

function CancellationPolicies() {
	const {
		data = {},
		loading = false,
		setFilters = () => {},
		filters = {},
		refetch = () => {},
	} = useListShipmentCancellationCharges({
		defaultParams  : { organization_trade_parties_data_required: true },
		defaultFilters : { status: 'active' },
	});

	const paginationProps = { setFilters, filters, data };

	return (
		<div className={styles.container}>
			<Header
				filterValues={filters}
				setFilterValues={setFilters}
				refetch={refetch}
				loading={loading}
			/>

			<ListPagination {...paginationProps} />

			<ListingArea data={data} refetch={refetch} loading={loading} />

			<ListPagination {...paginationProps} />

		</div>
	);
}

export default CancellationPolicies;
