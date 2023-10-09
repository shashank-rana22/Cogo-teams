import { Tooltip } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

function CommodityDetails({ isAir = false, detail = {}, commodityDataDetails = {} }) {
	const { commodity, commodity_sub_type, commodity_type } = detail || {};
	const { commodity_subtype } = commodityDataDetails || {};
	if (isAir) {
		return (
			<div>
				{`${startCase(commodity)}, ${startCase(
					commodity_type,
				)}, ${startCase(
					commodity_subtype || commodity_sub_type,
				)}`}

			</div>
		);
	}
	if (commodity === 'special_consideration') {
		return (
			<Tooltip
				placement="bottom"
				content={(
					<div>
						{!isEmpty(commodity_type) ? (
							<div>
								Commodity Type:
								{startCase(commodity_type)}
							</div>
						) : null}
						{(commodity_subtype
								|| commodity_sub_type) && (
									<div>
										Commodity Sub Type:
										{startCase(
											commodity_subtype
											|| commodity_sub_type,
										)}
									</div>
						)}
					</div>
				)}
			>
				<div>{startCase(commodity)}</div>
			</Tooltip>
		);
	}
	return <div>{startCase(commodity)}</div>;
}

export default CommodityDetails;
