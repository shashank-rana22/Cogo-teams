import styles from './styles.module.css';

function SignedUpColumns({ index = 0, item = {} }) {
	const { sign_up = {} } = item || {};
	const { user_count = 0, affiliate_count = 0 } = sign_up || {};

	const subTitleOptions = [
		{
			title : 'Users',
			name  : 'users',
			count : user_count,
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
