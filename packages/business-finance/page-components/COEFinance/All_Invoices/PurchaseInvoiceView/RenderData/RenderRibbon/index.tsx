import React from 'react';

import styled from './styles.module.css';

interface ItemProps {
	urgencyTag:Array<string>
}
interface Props {
	item: number | object;
}
function RenderRibbon({ item }:Props) {
	return (
		<div style={{ marginLeft: '40px' }}>
			{(item as ItemProps)?.urgencyTag ? (
				<div className={styled.ribbon}>Urgent</div>
			) : ''}
		</div>
	);
}

export default RenderRibbon;
