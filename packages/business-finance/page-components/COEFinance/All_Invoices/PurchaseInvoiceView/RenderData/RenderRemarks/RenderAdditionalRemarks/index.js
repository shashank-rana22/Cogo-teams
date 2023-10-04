import React from 'react';

function RenderAdditionalRemarks({ additionalRemarksList = [] }) {
	return (
		<div>
			{(additionalRemarksList || []).map((remark) => (
				<div key={remark} style={{ margin: '8px 0' }}>
					•
					{' '}
					{remark}
				</div>
			))}
		</div>
	);
}

export default RenderAdditionalRemarks;
