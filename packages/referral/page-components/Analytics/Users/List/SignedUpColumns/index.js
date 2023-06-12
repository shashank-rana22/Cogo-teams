import { SIGN_UP_TITLE_OPTIONS } from '../../../../../constants';

import styles from './styles.module.css';

const MINIMUM_VALUE = 0;

function SignedUpColumns({ index = MINIMUM_VALUE, item = {} }) {
	const { direct_data = {} } = item || {};

	return (
		SIGN_UP_TITLE_OPTIONS.map((node) => (
			<div className={styles.node} key={node.name}>
				{index === MINIMUM_VALUE ? (
					<div className={styles.node_title}>
						{node.title}
					</div>
				) : ''}
				<div className={styles.node_count}>
					{direct_data[node.name] || MINIMUM_VALUE}
				</div>
			</div>
		))
	);
}

export default SignedUpColumns;
