import { Popover, Select, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import ScopeSelect from '../../../../commons/ScopeSelect';
import CONTROLS from '../../../../config/CONTROLS_CONFIG.json';

import styles from './styles.module.css';

function PopoverContent({ filters, setFilters }) {
	const { shipment_type, trade_type } = filters;

	const handleFilterChange = (key, val) => {
		setFilters({ ...filters, [key]: val, page: 1 });
	};

	return (
		<div className={styles.popover_content}>
			<Select
				onChange={(val) => handleFilterChange('shipment_type', val)}
				options={CONTROLS.shipment_types}
				value={shipment_type}
			/>
			<div className={styles.trade_type_container}>
				{CONTROLS.trade_types.map(({ label, value }) => (
					<Button
						className={trade_type === value ? styles.active : styles.inactive}
						onClick={() => handleFilterChange('trade_type', value)}
					>
						{label}
					</Button>
				))}
			</div>
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

			<ScopeSelect defaultValues={{ scope: 'self' }} />
		</div>
	);
}
