import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

const MIN_LENGTH = 1;

function PackageDetails({ packages = [], inputValue = '' }) {
	if (packages?.length > MIN_LENGTH) {
		return (
			<Tooltip
				placement="bottom"
				content={(
					<div style={{ fontSize: '10px' }}>
						{(packages).map((item) => {
							const values = item
								? `${item?.packages_count} Pkg, (${item?.length}cm X ${
									item?.width
								}cm X ${item?.height}cm), ${startCase(item?.packing_type)}`
								: '';
							return <div key={item}>{values}</div>;
						})}
					</div>
				)}
			>
				<div className="cargo-details-info">
					{`Package: ${inputValue} + ${packages.length - MIN_LENGTH} more`}
				</div>
			</Tooltip>
		);
	}
	return (
		<div>
			Package:
			{' '}
			{inputValue}
		</div>
	);
}

export default PackageDetails;
