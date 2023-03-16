import { format } from '@cogoport/utils';

import useListMailDetails from '../../../../hooks/useGetMail';

import styles from './styles.module.css';

function MailConversation({ activeMail }) {
	const { data } = useListMailDetails({ activeMail });
	console.log('data:', data);

	const { bodyPreview = '', sentDateTime = '' } = data || {};

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.time_stamp}>
					{format(sentDateTime, 'HH:mm a dd MMM')}
				</div>
				<div
					className={styles.receive_message_container}
					dangerouslySetInnerHTML={{ __html: bodyPreview.replace(/(\r\n|\r|\n)/g, '<br>') }}
				/>
			</div>
		</div>
	);
}

export default MailConversation;
