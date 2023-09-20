import { Modal, Button, cl } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import GroupInformation from './GroupInformation';
import GroupSelection from './GroupSelection';
import Header from './Header';
import styles from './styles.module.css';

const FIRST_COMPONENT = 1;

function GroupCreateModal({
	setCreteTeams = () => {},
	creteTeams = false,
}) {
	const [activeComponent, setActiveComponent] = useState(FIRST_COMPONENT);
	const [selectedGroup, setSelectedGroup] = useState({
		group_type        : '',
		group_name        : '',
		group_description : '',
	});

	const showBackButton = activeComponent > FIRST_COMPONENT;

	const handleMove = () => {
		setActiveComponent(activeComponent + FIRST_COMPONENT);
	};

	const handleBack = () => {
		setActiveComponent(activeComponent - FIRST_COMPONENT);
	};

	const handleClose = () => {
		setCreteTeams(false);
		setActiveComponent(FIRST_COMPONENT);
		setSelectedGroup({
			group_type        : '',
			group_name        : '',
			group_description : '',
		});
	};

	const COMPONENT_MAPPING = {
		1 : GroupSelection,
		2 : GroupInformation,
	};

	const ActiveModalComp = COMPONENT_MAPPING[activeComponent];

	return (
		<Modal
			className={styles.styled_ui_modal_dialog}
			scroll={false}
			show={creteTeams}
			size="sm"
			placement="center"
			onClose={handleClose}
			closeOnOuterClick={false}
		>
			<Modal.Header />
			<Modal.Body>
				<Header />
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
					<Button
						className={styles.cancel}
						themeType="link"
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						onClick={handleMove}
					>
						Next

					</Button>
				</div>

			</div>

		</Modal>
	);
}

export default GroupCreateModal;
