import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRight, IcMReply } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import MailLoading from '../MailLoading';

import styles from './styles.module.css';

function ListMails({
	handleScroll = () => {},
	list = [],
	activeMail = '',
	loading = false,
	setActiveMail = () => {},
}) {
	return (
		<div
			className={styles.list_container}
			onScroll={handleScroll}
		>
			{(list || []).map(
				(itm) => {
					const {
						subject = '',
						sentDateTime = '',
						sender = {},
						bodyPreview = '',
						id = '',
					} = itm || {};

					const { emailAddress: { name = '' } = {} } = sender || {};

					return (
						<div
							key={id}
							role="presentation"
							onClick={() => setActiveMail(itm)}
							className={cl`${activeMail?.id === id ? styles.active_content : ''} ${styles.content}`}
						>
							<div className={styles.recipient_div}>
								<div className={styles.recipient_left}>
									<IcMReply className={styles.reply_back} />

									<div className={styles.recipient_name}>
										{name}
									</div>
								</div>

								<div className={styles.recipient_right}>
									<div className={styles.time}>
										{format(
											sentDateTime,
											GLOBAL_CONSTANTS.formats.datetime['HH:mm, dd/MM/yyy'],
										)}
									</div>

									<div className={styles.right_arrow}>
										<IcMArrowRight fill="#BDBDBD" />
									</div>
								</div>
							</div>

							<div className={styles.message_div}>
								<div className={styles.subject_container}>
									{subject}
								</div>

								<div
									className={styles.message_content}
									dangerouslySetInnerHTML={{ __html: bodyPreview }}
								/>
							</div>
						</div>
					);
				},
			)}
			{loading && <MailLoading />}
		</div>
	);
}

export default ListMails;
