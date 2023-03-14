import { Pill } from '@cogoport/components';
import { IcMArrowLeft, IcMFilter, IcMPin, IcMArrowRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import DummyInboxData from '../../configurations/dummy-data-inboxes';

import styles from './styles.module.css';

function MailDetails({ activeSelect = '', setShowContent = () => {}, setActiveSelect = () => {} }) {
	const handleClick = () => {
		setActiveSelect('');
		setShowContent(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.left_div}>
					<IcMArrowLeft className={styles.arrow_left} onClick={handleClick} />
					<div className={styles.title}>{startCase(activeSelect.replace('_', ' '))}</div>
				</div>
				<IcMFilter className={styles.filter_icon} />
			</div>
			<div className={styles.list_container}>
				{DummyInboxData.map((itm) => {
					const { recipient, time, subject, message, tags, pin } = itm || {};
					return (

						<div className={styles.content}>
							{(tags && pin) && (
								<div className={styles.top_div}>
									<div className={styles.tag_wrapper}>
										<Pill size="md" color="#FDEBE9">Escalated</Pill>
										<Pill size="md" color="#CFEAED">Shipment</Pill>
									</div>
									<IcMPin className={styles.pin_icon} />
								</div>
							)}
							<div className={styles.recipient_div}>
								<div className={styles.recipient_left}>
									<img
										src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/share_reply.svg"
										alt="reply"
										className={styles.reply_back}
									/>
									<div className={styles.recipient_name}>{recipient}</div>
								</div>
								<div className={styles.recipient_right}>
									<div className={styles.time}>{time}</div>
									<div className={styles.right_arrow}><IcMArrowRight fill="#BDBDBD" /></div>
								</div>
							</div>
							<div className={styles.message_div}>
								<div className={styles.subject_container}>{subject}</div>
								<div className={styles.message_content}>{message}</div>
							</div>
						</div>

					);
				})}
			</div>
		</div>
	);
}
export default MailDetails;
