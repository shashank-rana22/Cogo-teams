import { Tooltip } from '@cogoport/components';
import React from 'react';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber';

import styled from './styles.module.css';

interface ItemProps {
	urgencyTag:Array<string>
}
interface Props {
	item:ItemProps;
	field: {
		key: string;
		topKey: object;
		bottomKey: object;
		label: string;
	};
}
function RenderUrgencyTag({ item, field }:Props) {
	return (
		<div>
			{item?.urgencyTag && field?.key === 'urgencyTag' ? (
				<Tooltip
					placement="top"
					content={(
						<div className={styled.urgency}>
							{item?.urgencyTag[0]}
						</div>
					)}
				>
					<div className={styled.urgency}>
						{showOverflowingNumber(item?.urgencyTag[0], 8)}
					</div>
				</Tooltip>

			) : '-'}
		</div>
	);
}

export default RenderUrgencyTag;
