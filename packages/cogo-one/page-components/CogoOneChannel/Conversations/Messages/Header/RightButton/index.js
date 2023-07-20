import { Popover, Button } from '@cogoport/components';
import { IcMListView } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../constants/viewTypeMapping';

import { getOptionsMapping } from './rightButtonHelpers';
import styles from './styles.module.css';

function RightButton({
	assignChat = () => {},
	openAssignModal = () => {},
	requestToJoinGroup = () => {},
	formattedData = {},
	requestForAssignChat = () => {},
	userId = '',
	assignLoading = false,
	requestAssignLoading = false,
	viewType = '',
	supportAgentId = '',
	isGroupFormed = false,
	showBotMessages = false,
	accountType = '',
	isPartOfGroup = false,
	isManager = false,
	hasNoFireBaseRoom = false,
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

	const getViewTypeAccessibleButtons = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.get_accesible_assign_buttons;

	const accessableButtons = getViewTypeAccessibleButtons?.({
		viewType,
		showBotMessages,
		supportAgentId,
		userId,
		isGroupFormed,
		isServiceProvider: accountType === 'service_provider',
		isPartOfGroup,
		isManager,
	}) || [];

	const loading = assignLoading || requestAssignLoading;

	if (hasNoFireBaseRoom || isEmpty(accessableButtons)) {
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
				{' '}
				Assign
			</Button>
		</Popover>
	);
}

export default RightButton;
