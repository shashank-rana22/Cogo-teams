import { Placeholder, cl } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React from 'react';

import EmptyStateTicketStructure from '../../../../../common/TicketStructure/EmptyStateTicketStructure';

import InitialMessage from './initialMessage';
import styles from './styles.module.css';
import TicketComment from './TicketComment';

function ChatBody({
	listData = {},
	chatLoading = false,
	getTicketActivity = () => {},
	messageRef = {},
	ticketData = {},
	ticketExists = false,
	setModalData = () => {},
	modalData = {},
	detailsLoading = false,
}) {
	const { id: userId = '' } = useSelector(({ profile }) => profile);
	const { items = [], last, page } = listData;

	const handleScroll = (e) => {
		const bottom = e.target.scrollTop === 0;
		if (!last && bottom && !chatLoading) {
			getTicketActivity((page || 0) + 1);
		}
	};

	if (!ticketExists && !chatLoading) {
		const emptyText = `No records for ticket #${modalData?.ticketId} found`;

		return (
			<EmptyStateTicketStructure
				setModalData={setModalData}
				emptyText={emptyText}
			/>
		);
	}

	return (
		<div className={styles.container} ref={messageRef} onScroll={handleScroll}>
			{chatLoading
				&& [...Array(9)].fill().map((key, idx) => (
					<div
						key={key}
						className={cl`${idx % 2 !== 0 ? styles.right_align : ''}`}
					>
						<Placeholder className={styles.loading_skeleton} />
					</div>
				))}

			{(last || (items || []).length < 10) && !detailsLoading && (
				<InitialMessage ticketData={ticketData} userId={userId} />
			)}

			{[...(items || [])].reverse().map((itm = {}) => {
				const { Type, Description, CreatedAt, TicketUser, Data } = itm || {};
				const { Url, TicketType = '' } = Data || {};
				const { SystemUserID } = TicketUser || {};

				return (
					<TicketComment
						key={CreatedAt}
						Type={Type}
						CreatedAt={CreatedAt}
						Description={Description}
						Url={Url}
						userId={userId}
						SystemUserID={SystemUserID}
						TicketType={TicketType}
					/>
				);
			})}
		</div>
	);
}

export default ChatBody;
