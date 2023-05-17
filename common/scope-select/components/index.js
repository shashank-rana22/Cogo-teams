import { Button, Popover } from '@cogoport/components';
import { IcMUsersManageAccounts } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';


import useScope from '../hooks/useScope';

import PopoverContent from './PopoverContent';
import styles from './styles.module.css';

export default function ScopeSelect({
	size = 'sm',
	themeType = 'secondary',
	className = '',
	defaultValues = {},
	showChooseAgent = true,
	popoverSize = 'sm',
	apisToConsider = [],
}) {
	const [showPopover, setShowPopover] = useState(false);

	const closePopover = () => setShowPopover(false);

	const {
		handleApply, scopeData, scope, viewType, selectedAgentId,
	} = useScope({ defaultValues, closePopover, apisToConsider });

	return (
		<Popover
			visible={showPopover}
			onClickOutside={closePopover}
			render={(
				<PopoverContent
					onClose={closePopover}
					onApply={handleApply}
					scopeData={scopeData}
					scope={scope}
					viewType={viewType}
					selectedAgentId={selectedAgentId}
					size={popoverSize}
					showChooseAgent={showChooseAgent}
					key={showPopover}
				/>
			)}
		>
			<Button
				size={size}
				onClick={() => setShowPopover((p) => !p)}
				className={`${styles.popover_children} ${styles[size]} ${className}`}
				themeType={themeType}
			>
				<div className={styles.ellipsis_text}>{startCase(scope) || 'My View'}</div>

				{viewType ? (
					<div className={styles.view_type}>
						(
						<div className={styles.ellipsis_text}>{startCase(viewType)}</div>
						)
					</div>
				) : null}

				{selectedAgentId ? <IcMUsersManageAccounts className={styles.agent_icon} /> : null}
			</Button>
		</Popover>
	);
}
