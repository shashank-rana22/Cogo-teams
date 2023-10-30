import React from 'react';

import styled from './styles.module.css';

function RenderRibbon({ item }) {
	return (
		<div style={{ marginLeft: '40px' }}>
			{(item)?.urgencyTag ? (
				<div className={styled.ribbon}>Urgent</div>
			) : ''}
		</div>
	);
}

export default RenderRibbon;
