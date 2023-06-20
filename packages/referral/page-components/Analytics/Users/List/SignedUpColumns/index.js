import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { SIGN_UP_TITLE_OPTIONS } from '../../../../../constants';

import styles from './styles.module.css';

const SIGN_UP_MIN_COUNT = 0;

function SignedUpColumns({ index = 0, item = {} }) {
	const { direct_data = {} } = item || {};

	return (
		SIGN_UP_TITLE_OPTIONS.map((node) => (
			<div className={styles.node} key={node.name}>
				{index === GLOBAL_CONSTANTS.zeroth_index ? (
					<div className={styles.node_title}>
						{node.title}
					</div>
				) : ''}
				<div className={styles.node_count}>
					{direct_data[node.name] || SIGN_UP_MIN_COUNT}
				</div>
			</div>
		))
	);
}

export default SignedUpColumns;
