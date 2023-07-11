import { Select, Datepicker } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations, asyncFieldsOperators } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

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

	const handleFilter = (value, location_type) => {
		setFilters((prev) => ({ ...prev, [location_type]: value, page: 1 }));
	};
	const sortByOptions = [
		{ label: 'abc', value: 'abc' },
	];

	return (
		<div className={styles.filter}>
			<div className={styles.filter_left}>
				<Select
					className={styles.filter_select}
					{...originPortOptions}
					placeholder="Origin Port"
					value={filters?.origin_port}
					onChange={(value) => handleFilter(value, 'origin_port')}
				/>
				<Select
					className={styles.filter_select}
					{...destinationPortOptions}
					placeholder="Destination Port"
					value={filters?.destination_port}
					onChange={(value) => handleFilter(value, 'destination_port')}
				/>
				<Datepicker
					className={styles.input}
					placeholder="Departure Date"
					showTimeSelect
					dateFormat="MM/dd/yyyy HH:mm"
					name="date"
					onChange={(value) => setFilters({ ...filters, date: value })}
					value={filters?.date}
					size="md"
				/>
			</div>
			<div className={styles.filter_right}>
				<Select
					className={styles.filter_select}
					placeholder="Shipping Line"
					onChange={(value) => setFilters({ ...filters, shipping_line: value })}
					{...shippingLineOptions}
				/>
				<Select
					className={styles.filter_select}
					options={sortByOptions}
					placeholder="Sort By"
					onChange={(value) => setFilters({ ...filters, sort_by: value })}
				/>
			</div>
		</div>
	);
}
export default Filter;
