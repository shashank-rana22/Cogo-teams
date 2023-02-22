import { Avatar, Modal, Button, Input } from '@cogoport/components';
import SelectMobileNumber from '@cogoport/forms/page-components/Business/SelectMobileNumber';
import { isEmpty } from '@cogoport/utils';
// import { useState } from 'react';

// import useCreateLeadProfile from '../../hooks/useCreateLeadProfile';

import styles from './styles.module.css';

function EmptyState({
	type = '',
	handleNotes = () => {},
	handleReminder = () => {},
	user_type = '',
	userId = '',
	organizationId = '',
	setProfilevalue = () => {},
	profileValue = {},
	setShowAddNumber = () => {},
	showAddNumber = false,
	handleSubmit = () => {},
	leadLoading = false,
}) {
	const handleClick = () => {
		setShowAddNumber(true);
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
				<Modal
					show={showAddNumber}
					size="sm"
					onClose={() => setShowAddNumber(false)}
					className={styles.styled_ui_modal_dialog}
					scroll={false}
				>
					<Modal.Header title="Profile Details" />
					<Modal.Body>
						<div className={styles.wrapper}>
							<div className={styles.styled_label}>Enter Name</div>
							<Input
								size="sm"
								placeholder="Enter name"
								value={profileValue?.name}
								onChange={(a) => setProfilevalue((p) => ({ ...p, name: a }))}
							/>
						</div>
						<div className={styles.wrapper}>
							<div className={styles.styled_label}>Enter Phone Number</div>
							<SelectMobileNumber
								value={profileValue}
								onChange={(val) => setProfilevalue(val)}
								numberKey="number"
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							size="sm"
							themeType="accent"
							onClick={handleSubmit}
							disabled={leadLoading}
						>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			)}

		</>
	);
}
export default EmptyState;
