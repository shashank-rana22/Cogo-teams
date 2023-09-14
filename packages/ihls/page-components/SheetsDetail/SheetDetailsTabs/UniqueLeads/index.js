import { Table, MultiSelect } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useUniqueAthenaLeads from '../../../../hooks/useUniqueAthenaLeads';
import ListPagination from '../ListPagination';

import styles from './styles.module.css';
import tableColumn from './tableColumn.json';
import { tabColumns } from './tableColumns';

function UniqueLeads() {
	const router = useRouter();
	const [multiSelectValue, setMultiSelectValue] = useState([]);

	const options = [
		{ label: 'Importer', value: 'importer' },
		{ label: 'Exporter', value: 'exporter' },
		{ label: 'CHA', value: 'cha' },
	];
	const {
		data = {}, loading = false, setFilters = () => {},
		filters = {},
	} = useUniqueAthenaLeads({
		defaultParams: {
			page_limit               : 10,
			pagination_data_required : true,
		},
		defaultFilters: { cogo_lead_file_id: router.query.file_id },
	});

	const paginationProps = { setFilters, filters, data: tableColumn };
	console.log(data, 'data');

	const handleChange = (val) => {
		const tempFilter = {
			is_importer : val?.includes('importer'),
			is_exporter : val?.includes('exporter'),
			is_cha      : val?.includes('cha'),
		};

		setFilters((p) => ({ ...p, ...tempFilter }));
		setMultiSelectValue(val);
	};

	return (
		<div className={styles.container}>
			<div className={styles.filter_container}>

				<MultiSelect
					value={multiSelectValue}
					onChange={handleChange}
					placeholder="Select Type"
					isClearable
					options={options}
					className={styles.select}
				/>

				<ListPagination {...paginationProps} />
			</div>
			<Table
				loading={loading}
				columns={tabColumns}
				data={tableColumn?.list || []}
			/>
			<ListPagination {...paginationProps} />
		</div>
	);
}

export default UniqueLeads;
