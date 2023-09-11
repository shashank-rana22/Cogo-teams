import { IcMRefresh } from '@cogoport/icons-react';

import useGetAllMailsForUser from '../../../../hooks/useGetAllMailsForUser';

import MailsList from './MailsList';
import styles from './styles.module.css';

function UserMails({ firestore = {}, formattedMessageData = {}, mailProps = {} }) {
	const { setActiveMail = () => {} } = mailProps || {};

	const { user_id : userId = '' } = formattedMessageData;
	console.log('userId:', userId);

	const {
		mailsListData = [],
		handleScroll = () => {},
		mailListLoading = false,
		getFilteredMails = () => {},
		setMailData = () => {},
	} = useGetAllMailsForUser({ firestore, userId });

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

	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				<span>User Mails</span>
				<IcMRefresh
					className={styles.refresh_icon}
					onClick={handleReset}
				/>
			</div>
			<MailsList
				mailsListData={mailsListData}
				handleScroll={handleScroll}
				mailListLoading={mailListLoading}
				setActiveMail={setActiveMail}
			/>
		</div>
	);
}
export default UserMails;
