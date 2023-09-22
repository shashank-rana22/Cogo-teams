import { Button } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import ConfirmationModal from './ConfirmationModal';
import styles from './styles.module.css';

function FooterCard({ entityCode = '', bulkIrnGenerate = () => {}, bulkIrnLoading = false, checkedRows = [] }) {
	const [confirmation, setConfirmation] = useState(false);

	const irnLabel = ENTITY_FEATURE_MAPPING[entityCode]?.labels?.irn_label;

	return (
		<div className={styles.footer_div}>
			<div className={styles.total_invoice_count}>
				<div className={styles.heading_style}>
					{'Total Invoice Number\'s Selected'}
					{' '}
					:
					{' '}
					<span className={styles.count_ref}>{checkedRows?.length}</span>
				</div>
				<div>
					<Button
						disabled={bulkIrnLoading || isEmpty(checkedRows)}
						onClick={() => { setConfirmation(!confirmation); }}
					>
						Bulk
						{' '}
						{irnLabel}
						{' '}
						Generate
					</Button>
				</div>
			</div>
			<ConfirmationModal
				entityCode={entityCode}
				checkedRows={checkedRows}
				bulkIrnGenerate={bulkIrnGenerate}
				bulkIrnLoading={bulkIrnLoading}
				confirmation={confirmation}
				setConfirmation={setConfirmation}
			/>
		</div>
	);
}

export default FooterCard;
