import styles from './styles.module.css';

function AssignedStakeholder({ data = {} }) {
	return (
		<div className={styles.stakeholder}>
			KAM :
			{' '}
			{data?.booking_agent?.name}
		</div>
	);
}

export default AssignedStakeholder;
