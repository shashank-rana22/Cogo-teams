import { Table, Select } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useAthenaShipmentRecords from '../../../../hooks/useAthenaShipmentRecords';
import ListPagination from '../ListPagination';

import styles from './styles.module.css';
import tableColumn from './tableColumn.json';
import { tabColumns } from './tableColumns';

function ShipmentRecords() {
	const router = useRouter();
	const [selectValue, setSelectValue] = useState('');
	const {
		data = {}, loading = false, setFilters = () => {},
		filters = {},
	} = useAthenaShipmentRecords({
		defaultParams: {
			page_limit               : 10,
			pagination_data_required : true,
		},
		defaultFilters: { cogo_lead_file_id: router.query.file_id },
	});
	const handleChange = (val) => {
		if (val) {
			setFilters((p) => ({ ...p, shipment_mode: val }));
		} else {
			setFilters({});
		}
		setSelectValue(val);
	};
	const shipmentModeOptions = [
		{ label: 'Air', value: 'AIR' },
		{ label: 'Sea', value: 'SEA' },
	];

	const paginationProps = { setFilters, filters, data: tableColumn };
	console.log(data, 'data');

	return (
		<div className={styles.container}>
			<div className={styles.filter_container}>

				<Select
					value={selectValue}
					onChange={handleChange}
					placeholder="Select Type"
					isClearable
					options={shipmentModeOptions}
					className={styles.select}
				/>

				<ListPagination {...paginationProps} />
			</div>
			<div className={styles.table_container}>
				<Table
					loading={loading}
					columns={tabColumns}
					data={tableColumn?.list || []}
				/>
			</div>

			<ListPagination {...paginationProps} />
		</div>
	);
}

export default ShipmentRecords;
