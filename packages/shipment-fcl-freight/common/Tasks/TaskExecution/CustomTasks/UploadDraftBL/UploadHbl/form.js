import React, { forwardRef } from 'react';

function Form(props) {
	const { id, bl_type = '' } = props || {};

	return (
		<div style={{ marginBottom: 10 }}>
			<div>
				{`${bl_type} ${id + 1}`}
			</div>

			<br />
		</div>
	);
}

export default forwardRef(Form);
