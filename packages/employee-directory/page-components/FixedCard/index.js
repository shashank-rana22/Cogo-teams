import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import BulkUpdate from './BulkUpdate';
import styles from './styles.module.css';

const DEFAULT_ARRAY_LENGTH = 10;

function FixedCard({
	selectedIds = [], refetch = () => {},
	setBulkActions = () => {},
	statsRefetch = () => {},
	setSelectedIds = () => {},
	filters = {},
}) {
	const selectedIdsLength = selectedIds.length;
	const [openBulkUpdateModal, setOpenBulkUpdateModal] = useState(false);
	return (
		<>
			<div className={styles.container}>
				<div className={styles.text}>
					Selected No. Of Employees :
					<span className={styles.span_text}>
						{' '}
						{selectedIdsLength > DEFAULT_ARRAY_LENGTH ? selectedIdsLength : `0${selectedIdsLength}`}
					</span>
				</div>
				<Button
					size="md"
					disabled={isEmpty(selectedIds)}
					onClick={() => setOpenBulkUpdateModal(true)}
				>
					Edit Information
				</Button>
			</div>
			{ openBulkUpdateModal && (
				<BulkUpdate
					show={openBulkUpdateModal}
					onClose={() => setOpenBulkUpdateModal(false)}
					refetch={refetch}
					setBulkActions={setBulkActions}
					selectedIds={selectedIds}
					statsRefetch={statsRefetch}
					setSelectedIds={setSelectedIds}
					filters={filters}
				/>
			) }
		</>
	);
}

export default FixedCard;
