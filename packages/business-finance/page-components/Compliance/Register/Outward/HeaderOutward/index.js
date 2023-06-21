import { Button, Select, Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { optionEntity, optionsGSTIN, optionsMonth, optionsYear } from '../helper';

import styles from './styles.module.css';

function HeaderOutward({ filters, setFilters, exportTrigger, loading }) {
	useEffect(() => {
		Toast.info('Prior Selection Of Entity Is Required In Order To Obtain The GSTIN.');
	}, []);
	return (
		<div className={styles.header_container}>
			<div>
				<div className={styles.filter_heading}>Entity</div>
				<Select
					value={filters?.entity}
					onChange={(val) => { setFilters((prev) => ({ ...prev, entity: val })); }}
					placeholder="Select Entity"
					options={optionEntity}
					isClearable
					style={{ width: '250px' }}
					size="sm"
				/>
			</div>

			<div className={styles.margin_select}>
				<div className={styles.filter_heading}>GSTIN</div>
				<Select
					value={filters?.gstIn}
					disabled={!filters?.entity}
					onChange={(val) => { setFilters((prev) => ({ ...prev, gstIn: val })); }}
					placeholder="Choose"
					options={optionsGSTIN(filters?.entity)}
					isClearable
					style={{ width: '250px' }}
					size="sm"
				/>
			</div>

			<div className={styles.margin_select}>
				<div className={styles.filter_heading}>Return Period</div>
				<Select
					value={filters?.month}
					onChange={(val) => { setFilters((prev) => ({ ...prev, month: val })); }}
					placeholder="Period"
					options={optionsMonth}
					isClearable
					style={{ width: '120px' }}
					size="sm"
				/>
			</div>

			<div className={styles.margin_select}>
				<div className={styles.filter_heading}>Year</div>
				<Select
					value={filters?.year}
					onChange={(val) => { setFilters((prev) => ({ ...prev, year: val })); }}
					placeholder="Year"
					options={optionsYear}
					isClearable
					style={{ width: '100px' }}
					size="sm"
				/>
			</div>

			<div className={styles.margin_select}>
				<Button loading={loading} onClick={exportTrigger}>Export </Button>
			</div>
		</div>
	);
}
export default HeaderOutward;
