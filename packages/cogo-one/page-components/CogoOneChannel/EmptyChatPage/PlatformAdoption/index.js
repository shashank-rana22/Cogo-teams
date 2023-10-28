import { Pagination } from '@cogoport/components';
import { IcMPlansExpiring, IcMRefresh } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetUnreadMailsCount from '../../../../hooks/useGetUnreadMailsCount';
import useGetUnreadMessagesCount from '../../../../hooks/useGetUnreadMessagesCount';
import useListOmnichannelOnboardingRequests from '../../../../hooks/useListOmnichannelOnboardingRequests';

import FilterSection from './FilterSection';
import PlatformHistory from './PlatformHistory';
import PlatformList from './PlatformList';
import styles from './styles.module.css';

function PlatformAdoption({
	mailProps = {}, firestore = {}, viewType = '', userId = '',
	isBotSession = false, setActiveTab = () => {},
}) {
	const { userSharedMails = [] } = mailProps || {};

	const [verifyAccount, setVerifyAccount] = useState({
		show               : false,
		showAccountDetails : false,
		accountData        : [],
		orgData            : {},
		verifyType         : '',
		accountType        : '',
	});
	const [showHistory, setShowHistory] = useState(false);

	const { unReadChatsCount } = useGetUnreadMessagesCount({
		firestore,
		viewType,
		agentId: userId,
		isBotSession,
	});

	const { unReadMailsCount = 0 } = useGetUnreadMailsCount({
		firestore,
		viewType,
		agentId: userId,
		isBotSession,
		userSharedMails,
	});

	const {
		loading = false, data = {},
		onboardingRequest = () => {},
	} = useListOmnichannelOnboardingRequests({ showHistory });

	const { list, ...rest } = data || {};
	const { page, page_limit, total_count } = rest || {};

	return (
		<div className={styles.container}>
			{showHistory ? (
				<PlatformHistory
					setShowHistory={setShowHistory}
					rest={rest}
					list={list}
					loading={loading}
					onboardingRequest={onboardingRequest}
				/>
			) : (
				<>
					<div className={styles.top_section}>
						<div className={styles.title}>
							Task for the Day
							{' '}
							<IcMRefresh className={styles.refresh} onClick={() => onboardingRequest({ page: 1 })} />
						</div>
						<div
							role="presentation"
							className={styles.history_title}
							onClick={() => setShowHistory((p) => !p)}
						>
							<IcMPlansExpiring fill="#034afd" />
							View History
						</div>
					</div>
					<FilterSection
						unReadChatsCount={unReadChatsCount}
						unReadMailsCount={unReadMailsCount}
						setActiveTab={setActiveTab}
					/>
					<PlatformList
						list={list}
						loading={loading}
						onboardingRequest={onboardingRequest}
						setActiveTab={setActiveTab}
						setVerifyAccount={setVerifyAccount}
						verifyAccount={verifyAccount}
						mailProps={mailProps}
					/>
					{page >= 1 ? (
						<div className={styles.pagination_info}>
							<Pagination
								type="table"
								currentPage={page}
								totalItems={total_count}
								pageSize={page_limit}
								onPageChange={(val) => onboardingRequest({ page: val })}
							/>
						</div>
					) : null}
				</>
			)}
		</div>
	);
}

export default PlatformAdoption;
