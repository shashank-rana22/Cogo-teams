import ProfileNumberModal from '../../page-components/CogoOneChannel/ProfileDetails/AgentDetails/ProfileNumberModal';

import RenderEmpty from './RenderEmpty';
import styles from './styles.module.css';

function EmptyState({
	type = '',
	setShowForm = () => {},
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
	showError = false,
	setShowError = () => {},
}) {
	const handleClick = () => {
		setShowAddNumber(true);
	};

	return (
		<>
			<div className={styles.empty_state}>
				<RenderEmpty
					type={type}
					setShowForm={setShowForm}
					handleReminder={handleReminder}
					user_type={user_type}
					userId={userId}
					organizationId={organizationId}
					handleClick={handleClick}
				/>
			</div>
			<ProfileNumberModal
				leadLoading={leadLoading}
				handleSubmit={handleSubmit}
				showAddNumber={showAddNumber}
				setProfilevalue={setProfilevalue}
				setShowAddNumber={setShowAddNumber}
				profileValue={profileValue}
				showError={showError}
				setShowError={setShowError}
			/>
		</>
	);
}
export default EmptyState;
