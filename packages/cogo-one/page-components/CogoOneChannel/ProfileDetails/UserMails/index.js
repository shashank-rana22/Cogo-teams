import { Badge, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMRefresh, IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { FilterControls } from '../../../../configurations/user-email-filters';
import useGetAllMailsForUser from '../../../../hooks/useGetAllMailsForUser';

import ApplicableFilters from './ApplicableFilters';
import MailsList from './MailsList';
import styles from './styles.module.css';

function UserMails({ firestore = {}, formattedMessageData = {}, mailProps = {} }) {
	const [showPopover, setShowPopover] = useState(false);

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
	} = useGetAllMailsForUser({ firestore, userId, channelChatId });

	const handleReset = () => {
		setMailData(
			{
				mailsListData        : [],
				lastMessageTimeStamp : Date.now(),
				isLastPage           : false,
				loading              : false,
			},
		);
		getFilteredMails({ lastMessageTimeStamp: Date.now() });
	};

	const setSelectedMail = (item) => {
		setActiveMail({ val: item, tab: 'firebase_emails', expandSideBar: false });
	};

	const {
		control,
		watch,
		handleSubmit,
		reset = () => {},
	} = useForm();

	const formValue = watch();

	const isEmptyFilters = Object.keys(formValue || {}).every((key) => isEmpty(formValue[key]));
	const isAppliedFilters = Object.keys(appliedFilters || {}).every((key) => isEmpty(appliedFilters[key]));

	const handleClearAll = () => {
		const nullFormValues = FilterControls.reduce(
			(prev, currentItem) => (
				{ ...prev, [currentItem?.name]: '' }
			),
			{},
		);

		reset(nullFormValues);
	};

	const handleApply = (val) => {
		setAppliedFilters(val);
		setShowPopover(false);
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				<span>User Mails</span>
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
								FilterControls={FilterControls}
								control={control}
								isEmptyFilters={isEmptyFilters}
								handleClearAll={handleClearAll}
								handleSubmit={handleSubmit}
								handleApply={handleApply}
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
				setSelectedMail={setSelectedMail}
			/>
		</div>
	);
}
export default UserMails;
