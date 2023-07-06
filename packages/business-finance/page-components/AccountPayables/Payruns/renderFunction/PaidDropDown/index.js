import { Button } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import React from 'react';

function PaidDropDown() {
	return (
		<div>
			<Button size="sm">
				<IcMArrowRotateDown height={16} width={16} />
			</Button>
		</div>
	);
}

export default PaidDropDown;
