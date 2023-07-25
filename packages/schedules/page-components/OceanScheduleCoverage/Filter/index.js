import { Button, MultiSelect } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

import styles from './styles.module.css';

const ONE = 1;
function Filter({ filters = {}, setFilters = () => {}, setCurrentPage = () => {} }) {
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

	const clearFilters = () => {
		setFilters(null);
	};

	const handleFilter = (value, location_type) => {
		setFilters((prev) => ({ ...prev, [location_type]: value }));
		setCurrentPage(ONE);
	};

	return (
		<div className={styles.filter}>
			<MultiSelect
				className={styles.filter_select}
				{...originPortOptions}
				placeholder="Origin Port"
				value={filters?.origin_port}
				onChange={(value) => handleFilter(value, 'origin_port')}
			/>
			<MultiSelect
				className={styles.filter_select}
				{...destinationPortOptions}
				placeholder="Destination Port"
				value={filters?.destination_port}
				onChange={(value) => handleFilter(value, 'destination_port')}
			/>
			<Button themeType="tirtery" onClick={clearFilters}>
				Clear Filter
			</Button>
		</div>
	);
}
export default Filter;
