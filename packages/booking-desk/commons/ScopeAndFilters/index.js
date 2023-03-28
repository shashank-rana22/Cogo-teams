import { Popover, Select, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import ScopeSelect from '@cogoport/scope-select';

import CONTROLS from '../../config/CONTROLS_CONFIG.json';
import handleShipmentTypeChange from '../../helpers/handleShipmentTypeChange';

import styles from './styles.module.css';

function PopoverContent({ stateProps }) {
	const { filters, setFilters } = stateProps;
	const { shipment_type, trade_type } = filters;

	const handleTradeTypeChange = (val) => {
		setFilters({ ...filters, trade_type: val, page: 1 });
	};

	return (
		<div className={styles.popover_content}>
			<Select
				onChange={(newShipmentType) => handleShipmentTypeChange({ stateProps, newShipmentType })}
				options={CONTROLS.shipment_types}
				value={shipment_type}
			/>

			<div className={styles.trade_type_container}>
				{CONTROLS.trade_types.map(({ label, value }) => (
					<Button
						className={trade_type === value ? styles.active : styles.inactive}
						onClick={() => handleTradeTypeChange(value)}
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
	const clearFilters = () => {
		setFilters({ shipment_type: filters.shipment_type, page: 1 });
	};

	return (
		<div className={styles.container}>
			<Button
				themeType="secondary"
				size="sm"
				className={styles.filter_text}
				onClick={clearFilters}
			>
				Clear Filters
			</Button>

			<Popover
				content={<PopoverContent stateProps={stateProps} />}
				placement="bottom"
			>
				<Button themeType="secondary" size="sm" className={styles.filter_text}>
					<IcMFilter />
					{' '}
					Filters
				</Button>
			</Popover>

			<ScopeSelect className={styles.filter_text} defaultValues={stateProps.scopeFilters} />
		</div>
	);
}
