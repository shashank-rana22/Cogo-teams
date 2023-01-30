import React from 'react';

import styled from './styles.module.css';

interface ItemProps {
	urgencyTag:Array<string>
}
interface Props {
	item:ItemProps;
}
function RenderUrgencyTag({ item }:Props) {
	return (
		<div>
			{item?.urgencyTag ? (
				<div className={styled.urgency}>
					{' '}
					{item?.urgencyTag[0]}
					{' '}
				</div>
			) : '-'}
		</div>
	);
}

export default RenderUrgencyTag;
