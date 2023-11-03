import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const SECOND_INDEX = 2;

function AgentAvatar({ text = '' }) {
	const getInitials = () => {
		const avtarName = text?.split(' ').map((n) => n[GLOBAL_CONSTANTS.zeroth_index]).join('');
		return text && avtarName.slice(GLOBAL_CONSTANTS.zeroth_index, SECOND_INDEX);
	};

	return (
		<Tooltip content={text} placement="top">
			<div className={styles.container}>
				<div className={styles.name_container}>{getInitials()}</div>
			</div>
		</Tooltip>
	);
}
export default AgentAvatar;
