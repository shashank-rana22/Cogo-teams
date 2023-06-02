import styles from './styles.module.css';

function InviteColumns({ index = 0, item = {}, type = '' }) {
	const { cogopoints = {} } = item || {};
	const {
		network_cogopoint_earned = 0,
		network_cogopoint_estimated = 0,
		referral_cogopoint_earned = 0,
		referral_cogopoint_estimated = 0,
	} = cogopoints || {};

	const subTitleOptions = [
		{
			title : 'Pending',
			name  : 'pending',
			count : type === 'total_cogopoints' ? referral_cogopoint_earned : referral_cogopoint_estimated,
		},
		{
			title : 'Accepted',
			name  : 'accepted',
			count : type === 'total_cogopoints' ? network_cogopoint_earned : network_cogopoint_estimated,
		},
		{
			title : 'Rejected',
			name  : 'rejected',
			count : type === 'total_cogopoints' ? network_cogopoint_earned : network_cogopoint_estimated,
		},
	];

	return (
		subTitleOptions.map((node) => (
			<div className={styles.node} key={node.name}>
				{index === 0 ? (
					<div className={styles.node_title}>
						{node.title}
					</div>
				) : ''}
				<div className={styles.node_count}>
					{node.count}
				</div>
			</div>
		))
	);
}

export default InviteColumns;
