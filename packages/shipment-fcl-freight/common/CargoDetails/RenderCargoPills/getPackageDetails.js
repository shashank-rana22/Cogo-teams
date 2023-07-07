import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';

const MORE_THAN_ONE_PACKAGE_CHECK = 1;
const SHOW_MORE_CHECK = 1;
const KEY_INCREMENTOR = 1;

const getPackageDetails = (packages) => {
	const valueForInput = Array.isArray(packages) && isEmpty(packages)
		? packages[GLOBAL_CONSTANTS.zeroth_index] : null;
	const dimension = valueForInput?.length
		? `${valueForInput?.length}cm X ${valueForInput?.width}cm X ${valueForInput?.height}cm,`
		: '';
	const inputValue = valueForInput
		? `${valueForInput.packages_count} Pkg, ${dimension} ${startCase(
			valueForInput?.packing_type,
		)}`
		: '';
	if (packages?.length > MORE_THAN_ONE_PACKAGE_CHECK) {
		return (
			<Tooltip
				placement="bottom"
				theme="light"
				content={(
					<div style={{ fontSize: '10px' }}>
						{(packages || []).map((item, index) => {
							const values = item
								? `${item.packages_count} Pkg, (${item?.length}cm X ${item?.width
								}cm X ${item?.height}cm), ${startCase(item?.packing_type)}`
								: '';
							return <div key={`${index + KEY_INCREMENTOR}`}>{values}</div>;
						})}
					</div>
				)}
			>
				<div className="cargo-details-info">
					{`Package: ${inputValue} + ${packages.length - SHOW_MORE_CHECK} more`}

				</div>
			</Tooltip>
		);
	}
	return `Package: ${inputValue}`;
};

export default getPackageDetails;
