import { SIGN_UP_TITLE_OPTIONS } from '../../../../../constants';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function SignedUpColumns({ index = 0, item = {} }) {
	const { direct_data = {} } = item || {};

	return (
		SIGN_UP_TITLE_OPTIONS.map((node) => (
			<div className={styles.node} key={node.name}>
				{index === DEFAULT_VALUE ? (
					<div className={styles.node_title}>
						{node.title}
					</div>
				) : ''}
				<div className={styles.node_count}>
					{direct_data[node.name] || DEFAULT_VALUE}
				</div>
			</div>
		))
	);
}

export default SignedUpColumns;
