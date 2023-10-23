import { Pagination } from '@cogoport/components';
import { IcMPlansExpiring } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetUnreadMailsCount from '../../../../hooks/useGetUnreadMailsCount';
import useGetUnreadMessagesCount from '../../../../hooks/useGetUnreadMessagesCount';
import useListOmnichannelOnboardingRequests from '../../../../hooks/useListOmnichannelOnboardingRequests';

import AdoptionList from './AdoptionList';
import FilterSection from './FilterSection';
import Loader from './Loader';
import styles from './styles.module.css';

function PlatformAdoption({
	mailProps = {}, firestore = {}, viewType = '', userId = '',
	isBotSession = false, setActiveTab = () => {},
}) {
	const { userSharedMails = [] } = mailProps || {};

	const [platformTab, setPlatformTab] = useState('chat_pending');
	const [verifyAccount, setVerifyAccount] = useState({
		show               : false,
		showAccountDetails : false,
		accountData        : [],
		orgData            : {},
		verifyType         : '',
		accountType        : '',
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

	const { loading = false, data = {}, onboardingRequest = () => {} } = useListOmnichannelOnboardingRequests();

	const { list, ...rest } = data || {};
	const { page, page_limit, total_count } = rest || {};

	return (
		<div className={styles.container}>
			<div className={styles.top_section}>
				<div className={styles.title}>Task for the Day</div>
				<div className={styles.history_title}>
					<IcMPlansExpiring fill="#034afd" />
					View History
				</div>
			</div>
			<FilterSection
				unReadChatsCount={unReadChatsCount}
				unReadMailsCount={unReadMailsCount}
				setActiveTab={setActiveTab}
				platformTab={platformTab}
				setPlatformTab={setPlatformTab}
			/>
			{loading ? <Loader /> : (
				<AdoptionList
					setActiveTab={setActiveTab}
					setVerifyAccount={setVerifyAccount}
					verifyAccount={verifyAccount}
					list={list}
					onboardingRequest={onboardingRequest}
				/>
			)}
			<div className={styles.pagination_info}>
				<Pagination
					type="number"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
				/>
			</div>
		</div>
	);
}

export default PlatformAdoption;
