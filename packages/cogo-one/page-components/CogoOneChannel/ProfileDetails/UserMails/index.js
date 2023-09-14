import { Badge, Popover, Input } from '@cogoport/components';
import { IcMRefresh, IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { SEARCH_QUERY_LIMIT } from '../../../../constants/mailConstants';
import useGetAllMailsForUser from '../../../../hooks/useGetAllMailsForUser';

import ApplicableFilters from './ApplicableFilters';
import MailsList from './MailsList';
import styles from './styles.module.css';

function UserMails({ firestore = {}, formattedMessageData = {}, mailProps = {} }) {
	const [showPopover, setShowPopover] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const { setActiveMail = () => {} } = mailProps || {};

	const { user_id : userId = '', id :channelChatId = '' } = formattedMessageData;

	const {
		mailsListData = [],
		handleScroll = () => {},
		mailListLoading = false,
		getFilteredMails = () => {},
		setMailData = () => {},
		setAppliedFilters = () => {},
		appliedFilters = {},
		setActiveMessage = () => {},
	} = useGetAllMailsForUser({ firestore, userId, channelChatId, searchValue, setActiveMail });

	const handleReset = () => {
		setMailData(
			{
				mailsListData        : [],
				lastMessageTimeStamp : null,
				isLastPage           : false,
				loading              : false,
			},
		);
		getFilteredMails({ lastMessageTimeStamp: Date.now() });
	};

	const isAppliedFilters = Object.keys(appliedFilters || {}).every((key) => isEmpty(appliedFilters[key]));

	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				<div className={styles.left_details}>
					Mails
					<div className={styles.input_container}>
						<Input
							size="sm"
							prefix={<IcMSearchlight width={18} height={18} />}
							placeholder="Search here..."
							value={searchValue}
							onChange={(val) => setSearchValue(val)}
						/>
					</div>
				</div>

				<div className={styles.filter_container}>
					<IcMRefresh
						className={styles.refresh_icon}
						onClick={handleReset}
					/>
					<Popover
						placement="left"
						visible={showPopover}
						render={(showPopover && (
							<ApplicableFilters
								setShowPopover={setShowPopover}
								setAppliedFilters={setAppliedFilters}
								appliedFilters={appliedFilters}
							/>
						)
						)}
					>
						{!isAppliedFilters
							? (
								<Badge color="orange">
									<IcMFilter
										className={styles.filter_icon}
										onClick={() => setShowPopover((prev) => !prev)}
									/>
								</Badge>
							)
							: (
								<IcMFilter
									className={styles.filter_icon}
									onClick={() => setShowPopover((prev) => !prev)}
								/>
							)}
					</Popover>
				</div>
			</div>
			<MailsList
				mailsListData={mailsListData}
				handleScroll={handleScroll}
				mailListLoading={mailListLoading}
				setActiveMessage={setActiveMessage}
			/>

			{searchValue ? (
				<div className={styles.note}>
					Only recent
					{' '}
					{SEARCH_QUERY_LIMIT}
					{' '}
					mails will be shown with search filter.
				</div>
			) : null}
		</div>
	);
}
export default UserMails;
