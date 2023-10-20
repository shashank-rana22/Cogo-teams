import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcAJobCard,
	IcMOverflowDot, IcMInfo, IcMDocument,
} from '@cogoport/icons-react';
import { useState } from 'react';

import RejectVerification from './RejectAccountModal';
import styles from './styles.module.css';

function AccountAllocateCard({ itm = {}, setVerifyAccount = () => {} }) {
	const { label, subLabel, currentAgent, requestedBy } = itm || {};

	const [showReject, setShowReject] = useState(false);
	const [reason, setReason] = useState({
		type        : '',
		otherReason : '',
	});

	return (
		<div className={styles.card}>
			<div className={styles.header_info}>
				<div className={styles.user_info}>
					<IcAJobCard />
					<div className={styles.org_details}>
						<Tooltip
							content="Cogoport private logistix limited"
							placement="top"
						>
							<div className={styles.business_name}>
								{label || '-'}
							</div>
						</Tooltip>
						<div className={styles.lower_section}>
							<div className={styles.trade_name}>
								{subLabel || '-'}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.action}>
					<IcMInfo />
					<IcMOverflowDot />
				</div>
			</div>
			<div className={styles.body_info}>
				<div className={styles.each_row}>
					<div className={styles.title}>Requested By : </div>
					<div className={styles.label}>
						{requestedBy}
						<div className={styles.date}>
							{formatDate({
								date       : new Date(),
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</div>
					</div>
				</div>
				<div className={styles.each_row}>
					<div className={styles.title}>Current Agent : </div>
					<div className={styles.label}>{currentAgent}</div>
				</div>
				<div className={styles.each_row}>
					<div className={styles.title}>Last Transaction : </div>
					<div className={styles.label}>
						{formatDate({
							date       : new Date(),
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</div>
				</div>
				<div className={styles.each_row}>
					<div className={styles.title}>Confirmation Proof :</div>
					<div
						className={styles.docs}
						role="presentation"
						onClick={() => {
							setVerifyAccount((prev) => ({
								...prev,
								show               : true,
								showAccountDetails : false,
								accountData        : {},
							}));
						}}
					>
						<IcMDocument width={15} height={15} />
						<span>View All</span>
					</div>
				</div>
			</div>
			<div className={styles.line_break} />
			<div className={styles.footer_info}>
				<div role="presentation" className={styles.reject} onClick={() => setShowReject(true)}>Reject</div>
				<div className={styles.allocate}>Allocate</div>
			</div>
			<RejectVerification
				showReject={showReject}
				setShowReject={setShowReject}
				reason={reason}
				setReason={setReason}
			/>
		</div>
	);
}

export default AccountAllocateCard;
