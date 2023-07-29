import { Checkbox } from '@cogoport/components';
import React from 'react';

function BulkAction({ setBulkActions = () => {}, setSelectedIds = () => {} }) {
	const handleBulkEdit = (e) => {
		const { checked } = e.target;

		if (!checked) {
			setSelectedIds([]);
		}

		setBulkActions((prev) => ({ ...prev, bulkEdit: e.target.checked }));
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
