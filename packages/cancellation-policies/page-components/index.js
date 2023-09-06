import { Loader } from '@cogoport/components';

import useListShipmentCancellation from '../hooks/useListShipmentCancellation';

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
	} = useListShipmentCancellation({
		defaultParams  : { organization_trade_parties_data_required: true },
		defaultFilters : { status: 'active' },
	});

	if (loading) {
		return (
			<div>
				Loading...
				<Loader themeType="secondary" />
			</div>
		);
	}

	const paginationProps = { setFilters, filters, data };

	return (
		<div className={styles.container}>
			<Header
				filterValues={filters}
				setFilterValues={setFilters}
				refetch={refetch}
			/>

			<ListPagination {...paginationProps} />

			<ListingArea data={data} />

			<ListPagination {...paginationProps} />

		</div>
	);
}

export default CancellationPolicies;
