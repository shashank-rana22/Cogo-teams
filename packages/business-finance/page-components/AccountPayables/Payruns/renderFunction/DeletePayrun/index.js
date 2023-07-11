import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

function DeletePayrun() {
	return (
		<div>
			<Button themeType="tertiary">
				<IcMDelete height={20} width={20} color="#EE3425" />
			</Button>
		</div>
	);
}

export default DeletePayrun;
