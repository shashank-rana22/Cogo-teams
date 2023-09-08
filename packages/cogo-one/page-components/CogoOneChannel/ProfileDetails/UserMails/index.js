import useGetAllMailsForUser from '../../../../hooks/useGetAllMailsForUser';

import MailsList from './MailsList';
import styles from './styles.module.css';

function UserMails({ firestore = {}, formattedMessageData = {} }) {
	const { user_id : userId = '' } = formattedMessageData;

	const {
		mailsListData = [],
		handleScroll = () => {},
		mailListLoading = false,
	} = useGetAllMailsForUser({ firestore, userId });
	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				User Mails
			</div>
			<MailsList mailsListData={mailsListData} handleScroll={handleScroll} mailListLoading={mailListLoading} />
		</div>
	);
}
export default UserMails;
