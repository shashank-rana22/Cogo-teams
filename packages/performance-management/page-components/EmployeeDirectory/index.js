import { Toggle } from '@cogoport/components';
import { useState } from 'react';

import ListView from './ListView';
import styles from './styles.module.css';
import TreeView from './TreeView';

function OrganizationTree() {
	const [viewType, setViewType] = useState(false);

	return (
		<>
			<div className={styles.header}>
				<div className={styles.header_text}>
					Organization
				</div>
			</div>

			<div className={styles.view_type}>
				<Toggle
					name="viewType"
					checked={viewType}
					size="md"
					onLabel="Tree View"
					offLabel="List View"
					onChange={(e) => setViewType(e.target.checked)}
				/>

				{viewType ? (
					<TreeView viewType={viewType} />
				) : <ListView viewType={viewType} />}
			</div>
		</>

	);
}

export default OrganizationTree;
