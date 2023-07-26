import { Checkbox } from '@cogoport/components';
import React from 'react';

function BulkAction({ setBlukActions = () => {}, setSelectedIds = () => {} }) {
	const handleBulkEdit = (e) => {
		const { checked } = e.target;

		if (!checked) {
			setSelectedIds([]);
		}

		setBlukActions((prev) => ({ ...prev, bulkEdit: e.target.checked }));
	};

	return (
		<div>
			<Checkbox
				onChange={(e) => handleBulkEdit(e)}
				label="Bulk Edit"
			/>
		</div>
	);
}

export default BulkAction;
