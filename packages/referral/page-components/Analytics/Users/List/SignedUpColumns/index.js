import { SIGN_UP_TITLE_OPTIONS } from '../../../../../constants';

import styles from './styles.module.css';

function SignedUpColumns({ index = 0, item = {} }) {
	const { direct_data = {} } = item || {};

	return (
		SIGN_UP_TITLE_OPTIONS.map((node) => (
			<div className={styles.node} key={node.name}>
				{index === 0 ? (
					<div className={styles.node_title}>
						{node.title}
					</div>
				) : ''}
				<div className={styles.node_count}>
					{direct_data[node.name] || 0}
				</div>
			</div>
		))
	);
}

export default SignedUpColumns;
