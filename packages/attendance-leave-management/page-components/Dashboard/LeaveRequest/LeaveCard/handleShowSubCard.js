import ExpenseSubCard from './ExpenseSubCard';
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
	const datamap = {
		'OFFBOARDING REQUESTS' : OffboardingSubCard,
		'LEAVE REQUESTS'       : LeaveSubCard,
		'EXPENSE REQUESTS'     : ExpenseSubCard,
	};

	const RENDER = datamap[request_label];
	return (
		<div className={styles.parent_div}>
			{(list || []).map((val) => (
				<RENDER
					val={val}
					updateLoading={updateLoading}
					isManager={isManager}
					key={`${val.id}${val.employee_code}`}
					handleLeaveUpdate={handleLeaveUpdate}
				/>
			))}

		</div>
	);
}

export default HandleShowSubCards;
