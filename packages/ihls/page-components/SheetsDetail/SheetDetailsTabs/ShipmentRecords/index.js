import { Table, Select } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useAthenaShipmentRecords from '../../../../hooks/useAthenaShipmentRecords';
import ListPagination from '../ListPagination';

import styles from './styles.module.css';
import { tabColumns } from './tableColumns';

const SHIPMENT_MODES = [
	{ label: 'Air', value: 'AIR' },
	{ label: 'Sea', value: 'SEA' },
];

function ShipmentRecords() {
	const router = useRouter();
	const [selectValue, setSelectValue] = useState('');
	const { data = {}, loading = false, setFilters = () => {}, filters = {} } = useAthenaShipmentRecords({
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

	const paginationProps = { setFilters, filters, data };

	return (
		<div className={styles.container}>
			<div className={styles.filter_container}>

				<Select
					value={selectValue}
					onChange={handleChange}
					placeholder="Select Type"
					isClearable
					options={SHIPMENT_MODES}
					className={styles.select}
				/>

				<ListPagination {...paginationProps} />
			</div>
			<div className={styles.table_container}>
				<Table
					loading={loading}
					columns={tabColumns}
					data={data?.list || []}
				/>
			</div>

			<ListPagination {...paginationProps} />
		</div>
	);
}

export default ShipmentRecords;
