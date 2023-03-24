import { Popover, Select } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import styles from './styles.module.css';

const importExportParams = {
	placeholder : 'Trade Type',
	isClearable : true,
	options     : [{ label: 'Export', value: 'export' }, { label: 'Import', value: 'import' }],
};

function PopoverContent({ filters, setFilters }) {
	importExportParams.onChange = (val) => {
		if (val && val !== filters.trade_type) {
			setFilters({ ...filters, trade_type: val, page: 1 });
		}
	};

	return (
		<div className={styles.popover_content}>
			<Select {...importExportParams} />
		</div>
	);
}

export default function ScopeAndFilters({ stateProps }) {
	const { filters, setFilters } = stateProps;

	return (
		<div className={styles.container}>
			<Popover
				content={<PopoverContent filters={filters} setFilters={setFilters} />}
				placement="bottom"
			>
				<div className={styles.filter_text}>
					<IcMFilter />
					{' '}
					Filters
				</div>
			</Popover>
		</div>
	);
}
