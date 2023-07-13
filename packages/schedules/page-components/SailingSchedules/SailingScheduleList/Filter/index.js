import { Select, Datepicker } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations, asyncFieldsOperators } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

import { sortByOptions } from '../../../common/utils/sortByOptions';

import styles from './styles.module.css';

function Filter({ filters, setFilters }) {
	const originPortOptions = useGetAsyncOptions(
		merge(asyncFieldsLocations(), {
			params: { filters: { type: ['seaport'] } },
		}),
	);

	const destinationPortOptions = useGetAsyncOptions(
		merge(asyncFieldsLocations(), {
			params: { filters: { type: ['seaport'] } },
		}),
	);

	const shippingLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type: 'shipping_line' } } },
	));

	const handleFilter = (value, type) => {
		setFilters((prev) => ({ ...prev, [type]: value, page: 1 }));
	};

	return (
		<div className={styles.filter}>
			<div className={styles.filter_left}>
				<Select
					className={styles.filter_select}
					{...originPortOptions}
					placeholder="Origin Port"
					value={filters?.origin_port_id}
					onChange={(value) => handleFilter(value, 'origin_port_id')}
				/>
				<Select
					className={styles.filter_select}
					{...destinationPortOptions}
					placeholder="Destination Port"
					value={filters?.destination_port_id}
					onChange={(value) => handleFilter(value, 'destination_port_id')}
				/>
				<Datepicker
					className={styles.input}
					placeholder="Departure Date"
					showTimeSelect
					dateFormat="MM/dd/yyyy HH:mm"
					name="departure_date"
					onChange={(value) => handleFilter(value, 'departure_date')}
					value={filters?.departure_date}
					size="md"
				/>
			</div>
			<div className={styles.filter_right}>
				<Select
					className={styles.filter_select}
					placeholder="Shipping Line"
					value={filters?.shipping_line_id}
					onChange={(value) => handleFilter(value, 'shipping_line_id')}
					{...shippingLineOptions}
				/>
				<Select
					className={styles.filter_select}
					options={sortByOptions}
					placeholder="Sort By"
					value={filters?.sort_by}
					onChange={(value) => handleFilter(value, 'sort_by')}
				/>
			</div>
		</div>
	);
}
export default Filter;
