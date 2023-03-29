import { Tooltip } from '@cogoport/components';
import { startCase, upperCase } from '@cogoport/utils';

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

export const renderValue = (label, value) => {
	switch (label) {
		case 'container_size': {
			return value.includes('HC') ? value.replace('HC', 'ft HC') : `${value}ft`;
		}
		case 'containers_count': {
			return `${value} Container${value > 1 ? 's' : ''}`;
		}
		case 'container_type':
		case 'destination_cargo_handling_type':
		case 'commodity': {
			return startCase(value);
		}
		case 'inco_term': {
			return `Inco - ${upperCase(value)}`;
		}
		case 'cargo_weight_per_container': {
			return `${value} MT`;
		}
		default: {
			return '';
		}
	}
};
