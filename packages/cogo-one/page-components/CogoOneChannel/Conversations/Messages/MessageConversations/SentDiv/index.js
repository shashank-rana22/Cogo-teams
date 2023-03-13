import { cl } from '@cogoport/components';
import { IcMCross, IcMListView } from '@cogoport/icons-react';
import { format, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import MessageBody from '../../../../../../common/MessageBody';
import { LOGO_URL } from '../../../../../../constants';

import styles from './styles.module.css';

function SentDiv({
	eachMessage = {},
}) {
	const {
		message_type = 'text',
		created_at = '',
		response,
		send_by = '',
		session_type = 'bot',
	} = eachMessage;

	const { btns = [], list = [] } = response;
	const [showList, setShowList] = useState(false);

	const date = format(new Date(created_at), 'dd MMM YYYY, HH:mm');
	const adminStyles = !!(send_by || session_type === 'admin') || false;
	return (
		<div className={styles.container}>
			<div className={styles.message_div}>
				<div className={styles.name}>
					Replied by
					{' '}
					{send_by || (session_type === 'admin' ? 'kam' : 'bot')}
					,
					<span className={styles.time_stamp}>{date}</span>
				</div>

				<div className={styles.styled_div}>
					<div className={cl`${styles.receive_message_container} 
						${adminStyles ? styles.admin_message_container : ''}`}
					>
						<MessageBody
							response={response}
							message_type={message_type}
						/>
					</div>

					{!isEmpty(btns) && (
						<div className={styles.btns_container}>
							{(btns || []).map((eachbtn) => <div className={styles.btn}>{eachbtn}</div>)}
						</div>
					) }
					{!isEmpty(list) && (
						<button
							className={styles.list_button}
							onClick={() => setShowList(!showList)}
						>
							{
								showList ? (
									<span className={styles.btn_container}>
										<IcMCross className={styles.btn_icon} />
										Hide
									</span>
								) : (
									<span className={styles.btn_container}>
										<IcMListView className={styles.btn_icon} />
										List
									</span>
								)
							}
						</button>
					) }
					{!isEmpty(list) && showList && (
						<div className={styles.list_container}>
							{(list || []).map((listItem) => (
								<div key={`msg-list-item-${listItem.id}`} className={styles.list_item}>
									<div className={styles.list_item_title}>{listItem?.title}</div>
									<div className={styles.list_item_description}>{listItem?.description}</div>
								</div>
							))}
						</div>
					) }
				</div>
			</div>
			<img
				src={LOGO_URL[adminStyles ? 'admin' : 'bot']}
				alt="KAM"
				className={styles.user_logo}
			/>
		</div>
	);
}
export default SentDiv;
