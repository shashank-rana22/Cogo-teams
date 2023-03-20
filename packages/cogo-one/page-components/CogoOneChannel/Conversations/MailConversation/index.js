import { Placeholder } from '@cogoport/components';
import { format } from '@cogoport/utils';

import useListMailDetails from '../../../../hooks/useGetMail';

import Emailbody from './Emailbody';
import Header from './Header';
import styles from './styles.module.css';

function MailConversation({ activeMail }) {
	const { data = {}, loading = false } = useListMailDetails({ activeMail });

	const {
		// bodyPreview = '',
		sentDateTime = '',
		subject = '',
		sender = {},
		toRecipients = [],
		body = {},
		ccRecipients = [],
	} = data || {};
	const { content = '' } = body || {};

	return (
		<div className={styles.container}>
			<Header subject={subject} loading={loading} />
			<Emailbody sender={sender} toRecipients={toRecipients} ccRecipients={ccRecipients} loading={loading} />
			{loading ? (
				<div className={styles.message_div}>
					<div className={styles.time_stamp}>
						<Placeholder width="80px" height="10px" />
					</div>
					<div className={styles.receive_message_container}>
						{[...Array(5)].map(() => (
							<Placeholder width="500px" height="20px" margin="0px 0px 10px 0px" />
						))}
					</div>
				</div>
			) : (
				<div className={styles.message_div}>
					<div className={styles.time_stamp}>
						{format(sentDateTime, 'HH:mm a dd MMM')}
					</div>
					<div
						className={styles.receive_message_container}
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				</div>
			)}

		</div>
	);
}

export default MailConversation;
