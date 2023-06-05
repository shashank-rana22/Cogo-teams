import { SUB_TITLE_OPTIONS } from '../../../../../constants';

import styles from './styles.module.css';

function InviteColumns({ index = 0, item = {} }) {
	const { invite_log = {} } = item || {};

	return (
		SUB_TITLE_OPTIONS.map((node) => (
			<div className={styles.node} key={node.name}>
				{index === 0 ? (
					<div className={styles.node_title}>
						{node.title}
					</div>
				) : ''}
				<div className={styles.node_count}>
					{invite_log[node.name] || 0}
				</div>
			</div>
		))
	);
}

export default InviteColumns;
