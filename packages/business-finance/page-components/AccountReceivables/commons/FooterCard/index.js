import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils'; import React, { useState } from 'react';

import ConfirmationModal from './ConfirmationModal';
import styles from './styles.module.css';

function FooterCard({ entityCode = '', bulkIrnGenerate = () => {}, bulkIrnLoading = false, checkedRows = [] }) {
	const [confirmation, setConfirmation] = useState(false);

	const { cogoport_entities : CogoportEntity } = GLOBAL_CONSTANTS || {};
	const { labels } = CogoportEntity[entityCode] || {};
	const { irn_label: IrnLabel } = labels || {};

	return (
		<div className={styles.footer_div}>
			<div className={styles.heading_style}>
				Total Invoice Number&apos;s Selected :
				{' '}
				<span className={styles.count_ref}>{checkedRows?.length}</span>
			</div>
			<div className={styles.button_style}>
				<Button
					disabled={bulkIrnLoading || isEmpty(checkedRows)}
					onClick={() => { setConfirmation(!confirmation); }}
				>
					Bulk
					{' '}
					{IrnLabel}
					{' '}
					Generate
				</Button>
			</div>
			<ConfirmationModal
				IrnLabel={IrnLabel}
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
