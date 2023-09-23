import Avatar from '../../../../common/Avatar';

import styles from './styles.module.css';

const RANK_SIZE_MAPPING = {
	1 : 'lg',
	2 : 'md',
	3 : 'sm',
};

function TopUsers(props) {
	const { topList, view } = props;

	return (
		<div className={styles.container}>
			{topList.map((item) => {
				const { id, rank, name, user, total_score, percentile } = item || {};

				const size = RANK_SIZE_MAPPING[rank] || 'md';

				return (
					<div key={id} className={styles.top_user_container}>
						<Avatar user={user} size={size} rank={rank} />

						<p className={styles.name}>
							{['owner_wise', 'manager_wise', 'kam_wise'].includes(view)
								? user?.name : name}
						</p>

						<div className={styles.bottom_panel}>
							<span>{total_score}</span>

							<span>
								{percentile}
								%
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default TopUsers;
