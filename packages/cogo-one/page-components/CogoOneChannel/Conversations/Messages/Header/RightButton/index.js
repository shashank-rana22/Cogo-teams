import { Popover, Button } from '@cogoport/components';
import { IcMListView } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { getOptionsMapping, ACCESSABLE_BUTTON_FUNC_MAPPING } from './rightButtonHelpers';
import styles from './styles.module.css';

function RightButton({
	assignChat,
	openAssignModal,
	requestToJoinGroup,
	formattedData,
	requestForAssignChat,
	userId,
	assignLoading,
	requestAssignLoading,
	viewType,
	supportAgentId,
	isGroupFormed,
	showBotMessages,
	accountType,
	isPartOfGroup,
}) {
	const [popoverProps, setPopoverProps] = useState({ isOpen: false, clickedButton: '' });

	const buttonsMapping = getOptionsMapping({
		requestToJoinGroup,
		assignChat,
		openAssignModal,
		formattedData,
		requestForAssignChat,
		userId,
		setPopoverProps,
	});

	const accessableButtons = ACCESSABLE_BUTTON_FUNC_MAPPING[viewType]?.({
		viewType,
		showBotMessages,
		supportAgentId,
		userId,
		isGroupFormed,
		isServiceProvider: accountType === 'service_provider',
		isPartOfGroup,
	}) || [];

	const loading = assignLoading || requestAssignLoading;

	if (isEmpty(accessableButtons)) {
		return (
			<Button
				themeType="secondary"
				size="md"
				className={styles.styled_button}
				disabled
			>
				Assign
			</Button>
		);
	}

	return (
		<Popover
			placement="bottom"
			trigger="click"
			render={accessableButtons.map((eachButtonType) => {
				const { onClick = () => {}, label } = (buttonsMapping[eachButtonType] || {});
				return (
					<Button
						key={eachButtonType}
						themeType="secondary"
						size="md"
						className={styles.popover_button}
						disabled={loading}
						loading={loading && (eachButtonType === popoverProps?.clickedButton)}
						onClick={() => {
							setPopoverProps((p) => ({ ...p, clickedButton: eachButtonType }));
							onClick();
						}}
					>
						{label}
					</Button>
				);
			})}
			visible={popoverProps?.isOpen}
			onClickOutside={() => setPopoverProps({ isOpen: false, clickedButton: '' })}
		>
			<Button
				themeType="secondary"
				size="md"
				className={styles.styled_button}
				onClick={() => setPopoverProps({ isOpen: true, clickedButton: '' })}
			>
				<IcMListView height={15} width={15} />
				&nbsp;
				Assign
			</Button>
		</Popover>
	);
}

export default RightButton;
