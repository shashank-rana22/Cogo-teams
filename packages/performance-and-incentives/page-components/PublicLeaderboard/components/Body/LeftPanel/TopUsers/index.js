import Avatar from '../../../../common/Avatar';

import styles from './styles.module.css';

const RANK_SIZE_MAPPING = {
	1 : 'lg',
	2 : 'md',
	3 : 'sm',
};

function TopUsers(props) {
	const { top_list } = props;

	return (
		<div className={styles.container}>
			{top_list.map((item) => {
				const { id, rank, name, score, percentile } = item;

				const size = RANK_SIZE_MAPPING[rank] || 'md';

				return (
					<div key={id} className={styles.top_user_container}>
						<Avatar user={item} size={size} />

						<p className={styles.name}>{name}</p>

						<div className={styles.bottom_panel}>
							<span>{score}</span>

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
