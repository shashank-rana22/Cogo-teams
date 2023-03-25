import { cl } from '@cogoport/components';
import { IcMArrowLeft, IcMArrowRight, IcMRefresh } from '@cogoport/icons-react';
import { isEmpty, format, startCase } from '@cogoport/utils';

import { replySvg } from '../../constants/MAIL_CONSTANT';
import useListMail from '../../hooks/useListMail';

import MailLoading from './MailLoading';
import styles from './styles.module.css';

function MailDetails({
	activeSelect = '',
	setActiveSelect = () => {},
	setActiveMail = () => {},
	activeMail = {},
	senderMail = '',
}) {
	const {
		listData = {},
		loading,
		getEmails = () => {},
		handleScroll = () => {},
		setPagination = () => {},
		setListData = () => {},
	} = useListMail({ activeSelect, senderMail });

	const {
		value: list = [],
	} = listData || {};

	const handleClick = () => {
		setActiveMail({});
		setActiveSelect(null);
	};

	function lastMessagePreview(previewData = '') {
		return (
			<div dangerouslySetInnerHTML={{ __html: previewData }} />
		);
	}

	const handleRefresh = () => {
		setListData({ value: [], isLastPage: false });
		setPagination(1);
		getEmails();
	};

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.header}>
					<div role="presentation" className={styles.left_div} onClick={handleClick}>
						<IcMArrowLeft className={styles.arrow_left} />
						<div className={styles.title}>{startCase(activeSelect.replace('_', ' '))}</div>
					</div>
					<IcMRefresh className={styles.filter_icon} onClick={handleRefresh} />
				</div>
				{isEmpty(list || []) && !loading ? (
					<div className={styles.empty_div}>
						No Data Found...
					</div>
				) : (
					<div
						className={styles.list_container}
						onScroll={(e) => {
							handleScroll(e.target.clientHeight, e.target.scrollTop, e.target.scrollHeight);
						}}
					>
						{(list || []).map((itm) => {
							const {
								subject = '',
								sentDateTime = '', sender, bodyPreview = '', id = '',
							} = itm || {};
							const { emailAddress } = sender || {};
							const { name = '' } = emailAddress || {};
							return (
								<div
									role="presentation"
									className={cl`
									${activeMail?.id === id ? styles.active_content : ''} ${styles.content}`}
									onClick={() => setActiveMail(itm)}
									key={id}
								>
									<div className={styles.recipient_div}>
										<div className={styles.recipient_left}>
											<img
												src={replySvg}
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
						{loading && <MailLoading />}
					</div>

				)}
			</div>
		</div>

	);
}
export default MailDetails;
