import { startCase } from '@cogoport/utils';
import React from 'react';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber';

import styled from './styles.module.css';

function RenderUrgencyTag({ item, field }) {
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
