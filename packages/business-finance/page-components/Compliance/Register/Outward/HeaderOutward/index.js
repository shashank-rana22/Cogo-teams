import { Button, Select } from '@cogoport/components';

import { optionEntity, optionsGSTIN, optionsMonth } from '../helper';

import styles from './styles.module.css';

function HeaderOutward({ filters, setFilters }) {
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
					style={{ width: '300px' }}
					size="sm"
				/>
			</div>

			<div>
				<div className={styles.filter_heading}>GSTIN</div>
				<Select
					value={filters?.gstin}
					onChange={(val) => { setFilters((prev) => ({ ...prev, gstin: val })); }}
					placeholder="Choose"
					options={optionsGSTIN(filters?.entity)}
					isClearable
					style={{ width: '300px' }}
					size="sm"
				/>
			</div>

			<div>
				<div className={styles.filter_heading}>Return Period</div>
				<Select
					value={filters?.month}
					onChange={(val) => { setFilters((prev) => ({ ...prev, month: val })); }}
					placeholder="Period"
					options={optionsMonth}
					isClearable
					style={{ width: '150px' }}
					size="sm"
				/>
			</div>

			<div>
				<Button>Export </Button>
			</div>
		</div>
	);
}
export default HeaderOutward;
