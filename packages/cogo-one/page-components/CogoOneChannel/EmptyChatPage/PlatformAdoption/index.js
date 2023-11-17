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

const MIN_COUNT = 0;

function PlatformAdoption({
	mailProps = {}, firestore = {}, viewType = '', userId = '',
	isBotSession = false, setActiveTab = () => {}, initialViewType = '',
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
	const [filterValues, setFilterValues] = useState({
		show             : false,
		requestType      : '',
		assignTo         : '',
		escalationCycle  : '',
		requestStatus    : '',
		start            : null,
		end              : null,
		requestCompleted : '',
	});

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
	} = useListOmnichannelOnboardingRequests({ showHistory, initialViewType, filterValues, setFilterValues });

	const { list, ...rest } = data || {};
	const { page, page_limit, total_count } = rest || {};

	const handleViewHistory = () => {
		setFilterValues({
			show             : false,
			requestType      : '',
			assignTo         : '',
			escalationCycle  : '',
			requestStatus    : '',
			start            : null,
			end              : null,
			requestCompleted : '',
		});
		setShowHistory((p) => !p);
	};

	return (
		<div className={styles.container}>
			{showHistory ? (
				<PlatformHistory
					rest={rest}
					list={list}
					loading={loading}
					onboardingRequest={onboardingRequest}
					setFilterValues={setFilterValues}
					filterValues={filterValues}
					initialViewType={initialViewType}
					handleViewHistory={handleViewHistory}
				/>
			) : (
				<>
					<div className={styles.top_section}>
						<div className={styles.title}>
							Task for the Day
							{' '}
							<span>{`(${total_count || MIN_COUNT})`}</span>
							{' '}
							<IcMRefresh className={styles.refresh} onClick={() => onboardingRequest({ page: 1 })} />
						</div>
						<div
							role="presentation"
							className={styles.history_title}
							onClick={handleViewHistory}
						>
							<IcMPlansExpiring fill="#034afd" />
							View History
						</div>
					</div>
					<FilterSection
						unReadChatsCount={unReadChatsCount}
						unReadMailsCount={unReadMailsCount}
						setActiveTab={setActiveTab}
						setFilterValues={setFilterValues}
						filterValues={filterValues}
						initialViewType={initialViewType}
					/>
					<PlatformList
						list={list}
						loading={loading}
						onboardingRequest={onboardingRequest}
						setActiveTab={setActiveTab}
						setVerifyAccount={setVerifyAccount}
						verifyAccount={verifyAccount}
						mailProps={mailProps}
						initialViewType={initialViewType}
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
