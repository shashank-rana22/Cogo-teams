import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import ConfirmationModal from './ConfirmationModal';
import styles from './styles.module.css';

function FooterCard({ bulkIrnGenerate = () => {}, bulkIrnLoading = false, checkedRows = [] }) {
	const [confirmation, setConfirmation] = useState(false);

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
					Bulk IRN Generate
				</Button>
			</div>
			<ConfirmationModal
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
