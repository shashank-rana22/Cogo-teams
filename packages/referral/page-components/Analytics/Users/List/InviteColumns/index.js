import styles from './styles.module.css';

function InviteColumns({ index = 0, item = {} }) {
	const { invite_log = {} } = item || {};
	const { pending = 0, accepted = 0, rejected = 0 } = invite_log || {};

	const subTitleOptions = [
		{
			title : 'Pending',
			name  : 'pending',
			count : pending,
		},
		{
			title : 'Accepted',
			name  : 'accepted',
			count : accepted,
		},
		{
			title : 'Rejected',
			name  : 'rejected',
			count : rejected,
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
