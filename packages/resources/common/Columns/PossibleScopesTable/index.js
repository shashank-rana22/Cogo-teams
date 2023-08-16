import { Popover, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import CustomTable from '../../CustomTable';

const FIRST_INDEX = 1;

function PossibleScopesTable({ resourceScopes = [], styles }) {
	const [showScopes, setShowScopes] = useState(false);
	const [pagination, setPagination] = useState(FIRST_INDEX);
	const columns = [
		{

			Header   : <div className={styles.head}>SCOPE TYPE</div>,
			accessor : (item = {}) => (
				<div className={styles.head_content}>
					<div
						className={styles.container}
					>
						{startCase(item.view_type || '--')}
					</div>
				</div>
			),
			id  : 'type',
			key : 'type',

		},
		{
			Header   : <div className={styles.head}>THROUGH CRITERIA</div>,
			accessor : (item = {}) => (
				<div className={styles.head_content}>
					<div
						className={styles.through_criteria_container}
					>
						{(item.through_criteria || []).map((criteria) => startCase(criteria || '--')).join(', ')}
					</div>
				</div>
			),
			id  : 'through_criteria',
			key : 'through_criteria',
		},
	];

	function ToolTipContent() {
		return (
			<CustomTable
				columns={columns}
				list={resourceScopes}
				pagination={pagination}
				setPagination={setPagination}
				total_count={resourceScopes.length}
				page_limit={resourceScopes.length}
				emptyText="No Scopes Found"
			/>
		);
	}

	return (
		<div>
			<Popover
				placement="bottom"
				visible={showScopes}
				content={ToolTipContent()}
				onClickOutside={() => setShowScopes(false)}
			>
				<Button type="button" size="sm" themeType="secondary" onClick={() => setShowScopes((pv) => !pv)}>
					Show Scopes
				</Button>
			</Popover>
		</div>
	);
}

export default PossibleScopesTable;
