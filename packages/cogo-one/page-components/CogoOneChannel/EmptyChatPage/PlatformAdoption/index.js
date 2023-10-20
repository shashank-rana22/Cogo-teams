import { Pagination } from '@cogoport/components';
import { IcMPlansExpiring } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetUnreadMailsCount from '../../../../hooks/useGetUnreadMailsCount';
import useGetUnreadMessagesCount from '../../../../hooks/useGetUnreadMessagesCount';

import AdoptionList from './AdoptionList';
import FilterSection from './FilterSection';
import styles from './styles.module.css';

function PlatformAdoption({
	mailProps = {}, firestore = {}, viewType = '', userId = '',
	isBotSession = false, setActiveTab = () => {},
}) {
	const { userSharedMails = [] } = mailProps || {};

	const [platformTab, setPlatformTab] = useState('chat_pending');

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
			<AdoptionList mailProps={mailProps} />
			<div className={styles.pagination_info}>
				<Pagination
					type="number"
					currentPage={1}
					totalItems={30}
					pageSize={6}
				/>
			</div>
		</div>
	);
}

export default PlatformAdoption;
