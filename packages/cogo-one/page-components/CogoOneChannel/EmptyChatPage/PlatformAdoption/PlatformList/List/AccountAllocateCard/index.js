import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcAJobCard, IcMDocument } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import PlatFormAdoptionAssign from '../../../../../../../common/PlatFormAdoptionAssign';

import RejectVerification from './RejectAccountModal';
import styles from './styles.module.css';

function AccountAllocateCard({
	list = [], setVerifyAccount = () => {}, onStatusUpdate = () => {},
	loadingUpdate = false, setRejectData = () => {}, rejectData = {},
}) {
	return (list || []).map((item) => {
		const {
			id = '', request_type = '', requesting_agent = {}, current_stakeholder = {}, escalation_cycle = '',
			created_at = '', last_transaction = {}, metadata = {}, organization = {}, serial_id = '',
		} = item || {};
		const { business_name = '' } = organization || {};
		const { updated_at = '', documents = [] } = last_transaction || {};
		const { agent = {} } = current_stakeholder || {};
		const { name: requestName } = agent || {};
		const { name = '' } = requesting_agent || {};
		const { id: requestId = '' } = metadata || {};

		return (
			<React.Fragment key={id}>
				<div className={styles.card}>
					<div className={styles.header_info}>
						<div className={styles.cycle_section}>
							<div className={styles.serail_id}>
								ID :
								{' '}
								{serial_id}
							</div>
							{escalation_cycle ? (
								<div className={cl`${styles.cycle} ${escalation_cycle === 'warning'
									? styles.warning : styles.escalate}`}
								>
									{startCase(escalation_cycle)}
								</div>
							) : null}
						</div>
						<div className={styles.wrap}>
							<div className={styles.user_info}>
								<IcAJobCard />
								<div className={styles.org_details}>
									<Tooltip
										content="Cogoport private logistix limited"
										placement="top"
									>
										<div className={styles.business_name}>
											{startCase(request_type) || '-'}
										</div>
									</Tooltip>
									<div className={styles.lower_section}>
										<div className={styles.trade_name}>
											{startCase(business_name) || '-'}
										</div>
									</div>
								</div>
							</div>
							<PlatFormAdoptionAssign data={item} type="allocation_request" />
							{/* <div className={styles.action}>
								<IcMInfo />
								<IcMOverflowDot />
							</div> */}
						</div>
					</div>
					<div className={styles.body_info}>
						<div className={styles.each_row}>
							<div className={styles.title}>Requesting Agent : </div>
							<div className={styles.label}>
								{name || '-'}
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
					requestId={requestId}
				/>
			</React.Fragment>
		);
	});
}

export default AccountAllocateCard;
