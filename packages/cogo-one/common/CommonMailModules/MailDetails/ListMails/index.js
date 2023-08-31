import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import { SEARCH_QUERY_LIMIT } from '../../../../constants/mailConstants';

import MailLoading from './MailLoading';
import styles from './styles.module.css';

function ListMails({
	handleScroll = () => {},
	list = [],
	activeMail = '',
	loading = false,
	setActiveMail = () => {},
	searchQuery = '',
}) {
	const emailsShown = (list || [])?.length;

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
									<div className={styles.recipient_name}>
										{name}
									</div>
									<div className={styles.time}>
										{formatDate({
											date       : sentDateTime,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyy'],
											timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
											formatType : 'dateTime',
											separator  : ', ',
										})}
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

			{(searchQuery && emailsShown >= SEARCH_QUERY_LIMIT)
				? (
					<div className={styles.search_list_error}>
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

export default ListMails;
