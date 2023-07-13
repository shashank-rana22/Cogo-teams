import { Datepicker, Input, Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsOperators } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

import { sortByOptions } from '../../../common/utils/sortByOptions';

import styles from './styles.module.css';

function Filter({ filter, setFilter }) {
	const shippingLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type: 'shipping_line' } } },
	));

	const handleFilter = (value, type) => {
		setFilter((prev) => ({ ...prev, [type]: value, page: 1 }));
	};
	return (
		<div className={styles.filter}>
			<div className={styles.filter_left}>
				<Input
					className={styles.input}
					placeholder="Vessel Name / Code"
					onChange={(value) => handleFilter(value, 'q')}
				/>

				<Datepicker
					className={styles.input}
					placeholder="Departure Date"
					showTimeSelect
					dateFormat="MM/dd/yyyy HH:mm"
					name="date"
					onChange={(value) => handleFilter(value, 'started_at')}
					value={filter?.started_at}
					size="md"
				/>
				<Select
					className={styles.input}
					placeholder="Shipping Line"
					value={filter?.shipping_line_id}
					onChange={(value) => handleFilter(value, 'shipping_line_id')}
					{...shippingLineOptions}
				/>

			</div>
			<div className={styles.filter_right}>
				<Select
					className={styles.input}
					options={sortByOptions}
					value={filter?.sort_by}
					placeholder="Sort By"
					onChange={(value) => handleFilter(value, 'sort_by')}
				/>
			</div>

		</div>
	);
}
export default Filter;
