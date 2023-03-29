import { Button, Popover } from '@cogoport/components';
import { IcMUsersManageAccounts } from '@cogoport/icons-react';
import { useState } from 'react';

import useScope from '../hooks/useScope';

import PopoverContent from './PopoverContent';
import styles from './styles.module.css';

export default function ScopeSelect({ size = 'sm', themeType = 'secondary', defaultValues, showChooseAgent = true }) {
	const [showPopover, setShowPopover] = useState(false);

	const closePopover = () => setShowPopover(false);

	const {
		handleApply, scopeData, scope, viewType, displayScope, displayViewType,
	} = useScope({ defaultValues, closePopover });

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
					size={size}
					showChooseAgent={showChooseAgent}
					key={showPopover}
				/>
			)}
		>
			<Button
				size={size}
				onClick={() => setShowPopover((p) => !p)}
				className={`${styles.popover_children} ${styles[size]}`}
				themeType={themeType}
			>
				<div className={styles.ellipsis_text}>{displayScope}</div>
				{displayViewType ? (
					<div className={styles.view_type}>
						(
						<div className={styles.ellipsis_text}>{displayViewType}</div>
						)
					</div>
				) : null}

				{scopeData.selected_agent_id ? <IcMUsersManageAccounts className={styles.agent_icon} /> : null}
			</Button>
		</Popover>
	);
}
