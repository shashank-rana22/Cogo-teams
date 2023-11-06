import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcAJobCard, IcMDocument } from '@cogoport/icons-react';
import React from 'react';

import { AccountInfoContent } from '../../../../../../../constants/platformAdoptionConstant';
import Header from '../../Header';

import RejectVerification from './RejectAccountModal';
import styles from './styles.module.css';

function AccountAllocateCard({
	item = {}, setVerifyAccount = () => {}, onStatusUpdate = () => {},
	loadingUpdate = false, setRejectData = () => {}, rejectData = {},
}) {
	const {
		id = '', request_type = '', requesting_agent = {}, current_stakeholder = {}, escalation_cycle = '',
		created_at = '', last_transaction = {}, metadata = {}, organization = {}, serial_id = '',
	} = item || {};
	const { business_name = '', tags = [], account_type = '' } = organization || {};
	const { updated_at = '', documents = [] } = last_transaction || {};
	const { agent = {} } = current_stakeholder || {};
	const { name: requestName } = agent || {};
	const { name = '' } = requesting_agent || {};
	const { id: allocationRequestId = '' } = metadata || {};

	return (
		<>
			<div className={styles.card}>
				<Header
					businessName={business_name}
					serialId={serial_id}
					item={item}
					requestType={request_type}
					escalationCycle={escalation_cycle}
					icon={<IcAJobCard width={25} height={25} />}
					tags={tags}
					accountType={account_type}
					content={<AccountInfoContent />}
				/>
				<div className={styles.body_info}>
					<div className={styles.each_row}>
						<div className={styles.title}>Requesting Agent : </div>
						<div className={styles.wrap}>
							<div className={styles.requestName}>{name || '-'}</div>
							<div className={styles.date}>
								{formatDate({
									date       : created_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})}
							</div>
						</div>
					</div>
					<div className={styles.each_row}>
						<div className={styles.title}>Current Agent : </div>
						<div className={styles.label}>{requestName}</div>
					</div>
					<div className={styles.each_row}>
						<div className={styles.title}>Last Transaction : </div>
						<div className={styles.label}>
							{formatDate({
								date       : updated_at,
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
									accountData        : documents,
									orgData            : item,
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
					<div
						role="presentation"
						className={cl`${styles.reject} ${loadingUpdate ? styles.disable : ''}`}
						onClick={() => setRejectData((prev) => ({
							...prev,
							type            : 'rejected',
							showRejectModal : true,
						}))}
					>
						Reject
					</div>
					<div
						role="presentation"
						className={cl`${styles.allocate} ${loadingUpdate ? styles.disable : ''}`}
						onClick={() => setRejectData((prev) => ({
							...prev,
							type            : 'approved',
							showRejectModal : true,
						}))}
					>
						Allocate
					</div>
				</div>
			</div>
			<RejectVerification
				setRejectData={setRejectData}
				rejectData={rejectData}
				loadingUpdate={loadingUpdate}
				onStatusUpdate={onStatusUpdate}
				allocationRequestId={allocationRequestId}
				id={id}
			/>
		</>
	);
}

export default AccountAllocateCard;
