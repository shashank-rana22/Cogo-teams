import LeaveSubCard from './LeaveSubCard';
import OffboardingSubCard from './OffboardingSubCard';
import styles from './styles.module.css';

function HandleShowSubCards(
	{
		request_label = '',
		updateLoading = () => {},
		isManager = false,
		handleLeaveUpdate = () => {},
		list = [],
	},
) {
	return (
		<div className={styles.parent_div}>
			{
			request_label === 'OFFBOARDING REQUESTS'
				? (
					<>
						{(list || []).map((val) => (
							<OffboardingSubCard
								val={val}
								updateLoading={updateLoading}
								isManager={isManager}
								key={`${val.id}${val.employee_code}`}
							/>
						))}

					</>
				)

				:				(
					<>
						{(list || []).map((val) => (
							<LeaveSubCard
								val={val}
								updateLoading={updateLoading}
								isManager={isManager}
								handleLeaveUpdate={handleLeaveUpdate}
								key={`${val.id}${val.employee_code}`}
							/>
						))}

					</>
				)

		}
		</div>
	);
}

export default HandleShowSubCards;
