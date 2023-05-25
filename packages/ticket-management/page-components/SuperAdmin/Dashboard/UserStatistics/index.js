import styles from './styles.module.css';
import Widget from './Widget';

function UserStatistics() {
	const data = [{
		agent_name : 'Tejas Gopal Bankar',
		org_name   : 'Voltas Pvt Ltd',
		count      : '9346',
	},
	{
		agent_name : 'Tejas Gopal Bankar',
		org_name   : 'Voltas Pvt Ltd',
		count      : '9346',
	}, {
		agent_name : 'Tejas Gopal Bankar',
		org_name   : 'Voltas Pvt Ltd',
		count      : '9346',
	}, {
		agent_name : 'Tejas Gopal Bankar',
		org_name   : 'Voltas Pvt Ltd',
		count      : '9346',
	}, {
		agent_name : 'Tejas Gopal Bankar',
		org_name   : 'Voltas Pvt Ltd',
		count      : '9346',
	}];

	return (
		<div className={styles.container}>
			<Widget label="Users (based on issues)" data={data} />
			<Widget label="Top Categories" data={data} />
			<Widget label="Top Agents" subLabel="Performance Rating" data={data} />
		</div>

	);
}

export default UserStatistics;
