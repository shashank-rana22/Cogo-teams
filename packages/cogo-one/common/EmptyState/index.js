import { Avatar, Modal, Button, Input } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateLeadProfile from '../../hooks/useCreateLeadProfile';

import styles from './styles.module.css';

function EmptyState({
	type = '',
	handleNotes = () => {},
	handleReminder = () => {},
	user_type = '',
	userId = '',
	organizationId = '',
}) {
	const [showAddNumber, setShowAddNumber] = useState(false);
	const [profileValue, setProfilevalue] = useState({
		name   : '',
		number : '',
	});

	const handleClick = () => {
		setShowAddNumber(true);
	};

	const { leadUserProfile, loading } = useCreateLeadProfile();

	const handleSubmit = async () => {
		await leadUserProfile({ profileValue });
		setShowAddNumber(false);
		setProfilevalue({});
	};

	const renderEmpty = () => {
		switch (type) {
			case 'profile':
				return (
					<div className={styles.container}>
						<div className={styles.header}>Profile</div>
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
								<div className={styles.type}>{user_type.replace('_', ' ')}</div>
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
					</div>
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
						<div className={styles.title}>No organisation details found</div>
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
							onClick={handleNotes}
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
	};
	return (
		<>
			<div className={styles.empty_state}>{renderEmpty()}</div>
			{showAddNumber && (
				<Modal show={showAddNumber} size="sm" onClose={() => setShowAddNumber(false)}>
					<Modal.Header title="Profile Details" />
					<Modal.Body>
						<div className={styles.phone_number}>Enter Name</div>
						<Input
							size="sm"
							placeholder="Enter name"
							value={profileValue?.name}
							onChange={(a) => setProfilevalue((p) => ({ ...p, name: a }))}
						/>
						<div className={styles.phone_number}>Enter Phone Number</div>
						<Input
							size="sm"
							placeholder="Enter number"
							value={profileValue?.number}
							onChange={(a) => setProfilevalue((p) => ({ ...p, number: a }))}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button size="sm" variant="primary" onClick={handleSubmit} disabled={loading}>Submit</Button>
					</Modal.Footer>
				</Modal>
			)}

		</>
	);
}
export default EmptyState;
