import { Tooltip, Pill } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const ARRAY_LENGTH = 1;

function Workscopes({ work_scopes = [] }) {
	if (!Array.isArray(work_scopes) || isEmpty(work_scopes)) {
		return work_scopes;
	}
	const totalWorkScopes = work_scopes.length;

	const renderToolTip = work_scopes.map((workscope) => (
		<Pill key={workscope} size="md" color="orange">
			{startCase(workscope)}
		</Pill>
	));

	return (
		<Tooltip content={renderToolTip} placement="bottom">
			<div className={styles.overflow_flex}>
				<div className={styles.item_value}>
					{startCase(work_scopes?.[ARRAY_LENGTH] || '___')}
				</div>
				<div>
					{totalWorkScopes > ARRAY_LENGTH && (
						<strong>
							(+
							{totalWorkScopes - ARRAY_LENGTH}
							)
						</strong>
					)}
				</div>
			</div>
		</Tooltip>
	);
}

export default Workscopes;
