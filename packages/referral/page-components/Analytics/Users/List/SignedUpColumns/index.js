import styles from './styles.module.css';

function SignedUpColumns({ index = 0, item = {} }) {
	const { direct_data = {} } = item || {};
	const { active_user_count = 0, affiliate_count = 0 } = direct_data || {};

	const subTitleOptions = [
		{
			title : 'Users',
			name  : 'users',
			count : active_user_count,
		},
		{
			title : 'Affiliates',
			name  : 'affiliates',
			count : affiliate_count,
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

export default SignedUpColumns;
