import { Tooltip, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const ZEROTH_INDEX = GLOBAL_CONSTANTS.zeroth_index;
const FIRST_INDEX = 1;

function Workscopes({ work_scopes = [] }) {
	const totalWorkScopes = work_scopes.length;

	if (totalWorkScopes === ZEROTH_INDEX) {
		return '___';
	}

	const renderToolTip = work_scopes.map((workscope) => (
		<Pill key={workscope} size="md" color="orange">
			{startCase(workscope)}
		</Pill>
	));

	return (
		<Tooltip content={renderToolTip} placement="bottom">
			<div className={styles.overflow_flex}>
				<div className={styles.item_value}>
					{startCase(work_scopes?.[ZEROTH_INDEX] || '___')}
				</div>
				<div>
					{totalWorkScopes > FIRST_INDEX && (
						<strong>
							(+
							{totalWorkScopes - FIRST_INDEX}
							)
						</strong>
					)}
				</div>
			</div>
		</Tooltip>
	);
}

export default Workscopes;
