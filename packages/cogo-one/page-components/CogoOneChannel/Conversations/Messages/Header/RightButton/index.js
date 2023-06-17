import { Popover, Button } from '@cogoport/components';
import { IcMListView } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { CommonButton, getOptionsMapping, getAccessableButtonOptions } from './rightButtonHelpers';
import styles from './styles.module.css';

function RightButton({
	assignChat,
	openAssignModal,
	addToGroup,
	formattedData,
	requestForAssignChat,
	userId,
	assignLoading,
	requestAssignLoading,
	viewType,
	supportAgentId,
	isGroupFormed,
	showBotMessages,
}) {
	const [popoverProps, setPopoverProps] = useState({ isOpen: false, clickedButton: '' });

	const buttonsMapping = getOptionsMapping({
		addToGroup,
		assignChat,
		openAssignModal,
		formattedData,
		requestForAssignChat,
		userId,
		setPopoverProps,
	});

	const accessableButtons = getAccessableButtonOptions({
		viewType,
		showBotMessages,
		supportAgentId,
		userId,
		isGroupFormed,
	});

	const loading = assignLoading || requestAssignLoading;

	if (isEmpty(accessableButtons)) {
		return (
			<Button
				themeType="secondary"
				size="md"
				className={styles.popover_button}
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
			render={accessableButtons.map((eachButtonType) => (
				<CommonButton
					key={eachButtonType}
					{...(buttonsMapping[eachButtonType] || {})}
					setPopoverProps={setPopoverProps}
					loading={loading && (eachButtonType === popoverProps?.clickedButton)}
					disabled={loading}
					buttonType={eachButtonType}
				/>
			))}
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
