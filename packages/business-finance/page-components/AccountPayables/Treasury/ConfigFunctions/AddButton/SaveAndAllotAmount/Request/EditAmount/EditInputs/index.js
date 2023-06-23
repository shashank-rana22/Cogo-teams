import { Input } from '@cogoport/components';
import { IcMRedo } from '@cogoport/icons-react';
import React from 'react';

function EditInputs() {
	return (
		<div>
			<div style={{ display: 'flex' }}>
				<Input type="number" />
				<IcMRedo />
			</div>
		</div>
	);
}

export default EditInputs;
