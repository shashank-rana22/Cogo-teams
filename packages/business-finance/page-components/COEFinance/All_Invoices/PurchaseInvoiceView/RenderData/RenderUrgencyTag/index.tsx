import { startCase } from '@cogoport/utils';
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

				<div className={styled.urgency}>
					{showOverflowingNumber(startCase(item?.urgencyTag[0]), 8)}
				</div>

			) : '-'}
		</div>
	);
}

export default RenderUrgencyTag;
