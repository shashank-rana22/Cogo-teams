import { Modal, Button, cl } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import GroupInformation from './GroupInformation';
import GroupSelection from './GroupSelection';
import Header from './Header';
import styles from './styles.module.css';
import Success from './Success';

const FIRST_COMPONENT = 1;
const SECOUND_COMPONENT = 2;

function GroupCreateModal({
	setCreateTeams = () => {},
	createTeams = false,
}) {
	const [activeComponent, setActiveComponent] = useState(FIRST_COMPONENT);
	const [isDisableNextButton, setIsDisableNextButton] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState({
		group_type        : '',
		group_name        : '',
		group_description : '',
	});

	const { group_type = '', group_name = '', group_description = '' } = selectedGroup || {};
	const showBackButton = activeComponent === SECOUND_COMPONENT;
	const showHeader = activeComponent <= SECOUND_COMPONENT;

	const handleClose = () => {
		setCreateTeams(false);
		setActiveComponent(FIRST_COMPONENT);
		setSelectedGroup({
			group_type        : '',
			group_name        : '',
			group_description : '',
		});
	};

	const handleMove = () => {
		if (showHeader) {
			setActiveComponent(activeComponent + FIRST_COMPONENT);
		} else {
			handleClose();
		}
	};

	const handleBack = () => {
		setActiveComponent(activeComponent - FIRST_COMPONENT);
	};

	const COMPONENT_MAPPING = {
		1 : GroupSelection,
		2 : GroupInformation,
		3 : Success,
	};

	const ActiveModalComp = COMPONENT_MAPPING[activeComponent];

	useEffect(() => {
		if (activeComponent === FIRST_COMPONENT) {
			setIsDisableNextButton(!group_type);
		} else if (activeComponent === SECOUND_COMPONENT) {
			setIsDisableNextButton(!group_name || !group_description);
		}
	}, [activeComponent, group_type, group_description, group_name]);

	return (
		<Modal
			className={styles.styled_ui_modal_dialog}
			scroll={false}
			show={createTeams}
			size="sm"
			placement="center"
			onClose={handleClose}
			closeOnOuterClick={false}
		>
			<Modal.Header />
			<Modal.Body>
				{showHeader ? (
					<Header
						activeComponent={activeComponent}
						selectedGroup={selectedGroup}
					/>
				) : null}

				<ActiveModalComp
					activeComponent={activeComponent}
					setActiveComponent={setActiveComponent}
					selectedGroup={selectedGroup}
					setSelectedGroup={setSelectedGroup}
				/>
			</Modal.Body>

			<div className={cl`${styles.footer} ${showBackButton ? styles.no_back : ''}`}>
				{showBackButton ? (
					<Button themeType="link" onClick={handleBack}>
						{' '}
						<IcMArrowBack width={16} height={16} className={styles.back} />
						Back
					</Button>
				) : null}

				<div className={styles.actions}>
					{showHeader ? (
						<Button
							className={styles.cancel}
							themeType="link"
							onClick={handleClose}
						>
							Cancel
						</Button>
					) : null}

					<Button
						onClick={handleMove}
						disabled={isDisableNextButton}
					>
						Next
					</Button>
				</div>

			</div>

		</Modal>
	);
}

export default GroupCreateModal;
