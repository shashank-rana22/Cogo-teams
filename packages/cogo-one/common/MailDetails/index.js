/* eslint-disable max-len */
import { cl } from '@cogoport/components';
import { IcMArrowLeft, IcMFilter, IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty, format, startCase } from '@cogoport/utils';

import useListMail from '../../hooks/useListMail';

import MailLoading from './MailLoading';
import styles from './styles.module.css';

function MailDetails({
	activeSelect = '',
	setShowContent = () => {},
	setActiveSelect = () => {},
	setActiveMail = () => {},
	activeMail,
}) {
	const { data = {}, loading } = useListMail({ activeSelect });
	const {
		value: list = [],
		handleScroll = () => {},
	} = data || {};

	const handleClick = () => {
		setActiveMail({});
		setActiveSelect('');
		setShowContent(false);
	};

	function lastMessagePreview(previewData = '') {
		return (
			<div
				role="presentation"
				dangerouslySetInnerHTML={{ __html: previewData }}
			/>
		);
	}

	if (loading) {
		return <MailLoading />;
	}

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.left_div}>
						<IcMArrowLeft className={styles.arrow_left} onClick={handleClick} />
						<div className={styles.title}>{startCase(activeSelect.replace('_', ' '))}</div>
					</div>
					{/* <IcMFilter className={styles.filter_icon} /> */}
				</div>
				{isEmpty(list || []) && !loading ? (
					<div className={styles.empty_div}>
						No Data Found...
					</div>
				) : (
					<div
						className={styles.list_container}
						onScroll={(e) => handleScroll(e.target.clientHeight, e.target.scrollTop, e.target.scrollHeight)}
					>
						{(list || []).map((itm) => {
							const { subject = '', sentDateTime = '', sender, bodyPreview = '', id = '' } = itm || {};
							const { emailAddress } = sender || {};
							const { name = '' } = emailAddress || {};
							return (
								<div
									role="presentation"
									className={cl`${activeMail?.id === id ? styles.active_content : ''} ${styles.content}`}
									onClick={() => setActiveMail(itm)}
								>
									<div className={styles.recipient_div}>
										<div className={styles.recipient_left}>
											<img
												src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/share_reply.svg"
												alt="reply"
												className={styles.reply_back}
											/>
											<div className={styles.recipient_name}>{name}</div>
										</div>
										<div className={styles.recipient_right}>
											<div className={styles.time}>{format(sentDateTime, 'HH:mm a')}</div>
											<div className={styles.right_arrow}><IcMArrowRight fill="#BDBDBD" /></div>
										</div>
									</div>
									<div className={styles.message_div}>
										<div className={styles.subject_container}>{subject}</div>
										<div className={styles.message_content}>{lastMessagePreview(bodyPreview)}</div>
									</div>
								</div>

							);
						})}
					</div>
				)}
			</div>
		</div>

	);
}
export default MailDetails;
