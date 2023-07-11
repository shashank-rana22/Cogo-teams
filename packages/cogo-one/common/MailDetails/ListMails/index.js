import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRight } from '@cogoport/icons-react';
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
							className={cl`${styles.content} ${activeMail?.id === id ? styles.active_content : ''}`}
						>
							<div className={styles.mail_view}>
								<div className={styles.recipient_div}>
									<div className={styles.recipient_left}>
										<div className={styles.recipient_name}>
											{name}
										</div>
										<div className={styles.time}>
											{format(
												sentDateTime,
												GLOBAL_CONSTANTS.formats.datetime['HH:mm, dd/MM/yyy'],
											)}
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
							<IcMArrowRight className={styles.arrow_styles} />
						</div>
					);
				},
			)}
			{loading && <MailLoading />}
		</div>
	);
}

export default ListMails;
