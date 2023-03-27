import { Tooltip, Pill } from '@cogoport/components';
import { startCase, upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

const labels = [
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'trucks_count',
	'trade_type',
	'packages',
	'haulage_type',
	'transport_mode',
	'cargo_weight_per_container',
	'destination_cargo_handling_type',
	'truck_type',
	'payment_term',
];

const packageDetails = (value) => {
	const valueForInput = Array.isArray(value) && value?.length > 0 ? value[0] : null;
	const dimension = valueForInput?.length
		? `${valueForInput?.length}cm X ${valueForInput?.width}cm X ${valueForInput?.height}cm,`
		: '';
	const inputValue = valueForInput
		? `${valueForInput.packages_count} Pkg, ${dimension} ${startCase(
			valueForInput?.packing_type,
		)}`
		: '';

	if (value?.length > 1) {
		return (
			<Tooltip
				placement="bottom"
				theme="light"
				content={(
					<div style={{ fontSize: '10px' }}>
						{(value || []).map((item) => {
							const values = item
								? `${item.packages_count} Pkg, (${item?.length}cm X ${
									item?.width}cm X ${item?.height}cm), ${startCase(item?.packing_type)}`
								: '';
							return <div>{values}</div>;
						})}
					</div>
				)}
			>
				<div className="cargo-details-info">
					{`Package: ${inputValue} + ${value.length - 1} more`}
				</div>
			</Tooltip>
		);
	}
	return `Package: ${inputValue}`;
};

const renderValue = (label, value) => {
	switch (label) {
		case 'container_size': {
			return value.includes('HC') ? value.replace('HC', 'ft HC') : `${value}ft`;
		}
		case 'containers_count': {
			return `${value} Container${value > 1 ? 's' : ''}`;
		}
		case 'container_type':
		case 'trade_type':
		case 'haulage_type':
		case 'transport_mode':
		case 'destination_cargo_handling_type':
		case 'truck_type':
		case 'payment_term':
		case 'container_load_type':
		case 'commodity': {
			return startCase(value);
		}
		case 'inco_term': {
			return `Inco - ${upperCase(value)}`;
		}
		case 'weight': {
			return `${value} kgs`;
		}
		case 'cargo_weight_per_container': {
			return `${value} MT`;
		}
		case 'trucks_count': {
			return `${value} Truck${value === 1 ? '' : 's'}`;
		}
		case 'packages': {
			if (value?.length === 0) {
				return null;
			}
			return packageDetails(value);
		}
		default: {
			return '';
		}
	}
};

const renderCargoPills = (cargo_detail) => (
	labels.map((label) => (cargo_detail[label]
		? (
			<Pill size="sm" key={label}>
				{renderValue(label, cargo_detail[label])}
			</Pill>
		)
		: null))
);

export default function CargoDetails({ cargo_details }) {
	const [firstCargoDetails, ...restCargoDetails] = cargo_details || [];

	return (
		<div className={styles.cargo_details_container}>
			{firstCargoDetails ? renderCargoPills(firstCargoDetails) : null}

			{restCargoDetails.length > 0 ? (
				<Tooltip
					content={(
						<div>
							{restCargoDetails.map((cargo_detail) => <div>{renderCargoPills(cargo_detail)}</div>)}
						</div>
					)}
					className="multiple-cargo"
					interactive
				>
					<div className={styles.more_details}>
						+
						{restCargoDetails.length}
						{' '}
						Detail
						{restCargoDetails.length > 1 ? 's' : ''}
					</div>
				</Tooltip>
			) : null}
		</div>
	);
}
