import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import Avatar from '../../../../../common/Avatar';

import styles from './styles.module.css';

const RANK_SIZE_MAPPING = {
	1 : 'lg',
	2 : 'md',
	3 : 'sm',
};

const VIEWS = ['owner_wise', 'manager_wise', 'kam_wise'];

const getDisplayName = ({ name }) => {
	if (name === 'sme') return 'SME';

	return startCase(name);
};

function TopUsers(props) {
	const { topList, view } = props;

	return (
		<div className={styles.container}>
			{topList.map((item) => {
				const { id, rank, name, user, total_score, percentile } = item || {};

				const size = RANK_SIZE_MAPPING[rank] || 'md';

				const displayName = VIEWS.includes(view) ? user?.name : getDisplayName({ name });

				return (
					<div key={id} className={styles.top_user_container}>
						<Avatar user={user} size={size} rank={rank} />

						<Tooltip content={(
							<p>
								{displayName}
							</p>
						)}
						>
							<p className={styles.name}>
								{displayName}
							</p>
						</Tooltip>

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
