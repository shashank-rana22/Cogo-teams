import { Tooltip } from '@cogoport/components';
import React from 'react';

interface ItemProps {
	organizationName:string,
}
interface Props {
	itemData:ItemProps;
	field:{
		key :string
	}
}

const renderCustomer = ({ itemData, field }:Props) => {
	const {	organizationName = '' } = itemData || {};

	return (
		<div>
			{field?.key === 'organizationName' && (
				<div>
					{organizationName.length > 18 ? (
						<Tooltip
							interactive
							placement="top"
							content={organizationName}
						>
							<text>{`${organizationName.substring(0, 15)}...`}</text>
						</Tooltip>
					) : (
						<text>{organizationName}</text>
					)}
				</div>
			)}
		</div>
	);
};

export default renderCustomer;
