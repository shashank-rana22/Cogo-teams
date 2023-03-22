import { Avatar } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { PLATFORM_MAPPING } from '../../../constants';
import styles from '../styles.module.css';

function RenderEmpty({
	type = '',
	setShowForm = () => {},
	handleReminder = () => {},
	user_type = '',
	userId = '',
	organizationId = '',
	handleClick = () => {},
}) {
	switch (type) {
		case 'profile':
			return (
				<>
					<div className={styles.profile_div}>
						<div className={styles.avatar}>
							<Avatar
								src="https://www.w3schools.com/howto/img_avatar.png"
								alt="img"
								disabled={false}
							/>
						</div>
						<div className={styles.details}>
							<div className={styles.name}>Anonymous User</div>
							<div className={styles.type}>{PLATFORM_MAPPING[user_type] || ''}</div>
						</div>
					</div>
					<div className={styles.content}>
						<div className={styles.title}>You don&apos;t have profile details for this user</div>
						<div
							className={styles.button_div}
							onClick={handleClick}
							role="presentation"
						>
							<div>Add phone number</div>
						</div>
					</div>
				</>

			);
		case 'organization':
			return (
				<div className={styles.content}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/org-empty.svg"
						alt=""
						width="100px"
						height="100px"
					/>
					<div className={styles.title}>No organization details found</div>
				</div>
			);
		case 'activities':
			return (
				<div className={styles.content}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/activities-empty.svg"
						alt=""
						width="100px"
						height="100px"
					/>
					<div className={styles.title}>
						You have no activities right now.
						Come back later
					</div>
				</div>
			);
		case 'help_desk':
			return (
				<div className={styles.content}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/activities-empty.svg"
						alt=""
						width="100px"
						height="100px"
					/>
					<div className={styles.title}>
						No Result Found
					</div>
				</div>
			);
		case 'documents':
			return (
				<div className={styles.content}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/activities-empty.svg"
						alt="documents"
						width="100px"
						height="100px"
					/>
					<div className={styles.title}>
						No Documents Found
					</div>
				</div>
			);
		case 'reminder':
			return (
				<div className={styles.content}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/reminder-empty.svg"
						alt=""
						width="100px"
						height="100px"
					/>
					<div className={styles.title}>No previous reminder found</div>
					{!isEmpty(organizationId) && !isEmpty(userId) && (
						<div
							className={styles.button_div}
							onClick={handleReminder}
							role="presentation"
						>
							<div>Set Reminder</div>
						</div>
					)}
				</div>
			);
		case 'notes':
			return (
				<div className={styles.content}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/notes-empty.svg"
						alt=""
						width="100px"
						height="100px"
					/>
					<div className={styles.title}>No previous notes found</div>
					<div
						className={styles.button_div}
						onClick={() => setShowForm(true)}
						role="presentation"
					>
						<div>Add Notes</div>
					</div>
				</div>
			);
		case 'insights':
			return (
				<div className={styles.content}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/insights.svg"
						alt=""
						width="100px"
						height="100px"
					/>
					<div className={styles.title}>No customer insights found</div>
				</div>
			);
		default:
			return null;
	}
}

export default RenderEmpty;
