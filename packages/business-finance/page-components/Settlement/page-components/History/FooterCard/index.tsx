import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import usePostSettlementToSage from '../../../hooks/usePostSettlementToSage';
import ConfirmationModal from '../ConfirmationModal';

import styles from './styles.module.css';

interface FooterCardProps {
	checkedRows?: object;
	refetch: ()=> void;
	setCheckedRows: (p: object)=> void;
}

function FooterCard({ checkedRows, refetch, setCheckedRows } : FooterCardProps) {
	const [confirmation, setConfirmation] = useState(false);
	const {
		bulkPostToSageAction,
		loading,
	} = usePostSettlementToSage({ refetch, setCheckedRows });

	const NO_POSTED_IDS = [];

	const settleIds = Object.entries(checkedRows);

	const totalRef = settleIds?.length || 0;

	settleIds.forEach((item) => {
		NO_POSTED_IDS.push(item[1]);
	});

	const notSettledIds = NO_POSTED_IDS?.flat(2);
	const disablePostToSage = notSettledIds?.length === 0;

	return (
		<div className={styles.footer_div}>
			<div className={styles.heading_style}>
				Total Ref. Number&apos;s Selected :
				{' '}
				<span className={styles.count_ref}>{totalRef}</span>
			</div>
			<div className={styles.button_style}>
				<Button
					disabled={loading || disablePostToSage}
					onClick={() => { setConfirmation(!confirmation); }}
				>
					Bulk Post to Sage
				</Button>
			</div>
			<ConfirmationModal
				bulkPostToSageAction={bulkPostToSageAction}
				confirmation={confirmation}
				setConfirmation={setConfirmation}
				loading={loading}
				notSettledIds={notSettledIds}
			/>
		</div>
	);
}

export default FooterCard;
