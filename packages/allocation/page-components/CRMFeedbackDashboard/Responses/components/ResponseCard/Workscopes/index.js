import { Tooltip, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Workscopes({ work_scopes = [] }) {
	const totalWorkScopes = work_scopes.length;

	if (totalWorkScopes === 0) {
		return '___';
	}

	const renderToolTip = work_scopes.map((workscope) => (
		<Pill size="md" color="orange">
			{startCase(workscope)}
		</Pill>
	));

	return (
		<Tooltip content={renderToolTip} placement="top" interactive>
			<div className={styles.overflow_flex}>
				<div className={styles.item_value}>
					{startCase(work_scopes?.[0] || '___')}
				</div>
				<span>
					{totalWorkScopes > 1 && (
						<strong>
							(+
							{totalWorkScopes - 1}
							)
						</strong>
					)}
				</span>
			</div>
		</Tooltip>
	);
}

export default Workscopes;
