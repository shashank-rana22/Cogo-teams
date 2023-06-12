import { SUB_TITLE_OPTIONS } from '../../../../../constants';

import styles from './styles.module.css';

const INVITE_LOG_DEFAULT_VALUE = 0;
const DEFAULT_INDEX_VALUE = 0;

function InviteColumns({ index = 0, item = {} }) {
	const { invite_log = {} } = item || {};

	return (
		SUB_TITLE_OPTIONS.map((node) => (
			<div className={styles.node} key={node.name}>
				{index === DEFAULT_INDEX_VALUE ? (
					<div className={styles.node_title}>
						{node.title}
					</div>
				) : ''}
				<div className={styles.node_count}>
					{invite_log[node.name] || INVITE_LOG_DEFAULT_VALUE}
				</div>
			</div>
		))
	);
}

export default InviteColumns;
