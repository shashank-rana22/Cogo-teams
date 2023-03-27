import { Button, Popover } from '@cogoport/components';
import { IcMUsersManageAccounts } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetScopeData from '../hooks/useGetScopeData';

import PopoverContent from './PopoverContent';
import styles from './styles.module.css';

export default function ScopeSelect({ size = 'sm', defaultValues, showChooseAgent = true }) {
	const [showPopover, setShowPopover] = useState(false);

	const closePopover = () => setShowPopover(false);

	const {
		handleApply, scopeData, scope, viewType, displayScope, displayViewType,
	} = useGetScopeData({ defaultValues, closePopover });

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
					key={showPopover}
					showChooseAgent={showChooseAgent}
				/>
			)}
		>
			<Button
				size={size}
				onClick={() => setShowPopover((p) => !p)}
				className={`${styles.popover_children} ${styles[size]}`}
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
