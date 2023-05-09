import { Button, Modal, Select, Chips } from '@cogoport/components';
import { IcMExpand } from '@cogoport/icons-react';

import styles from './styles.module.css';

export default function ModalContent({
	onClose,
	show,
	value,
	options,
	onChange,
	multiSelectedUser,
	setMultiSelectedUser,
	multiSelectedEdit,
	setMultiSelectedEdit,
}) {
	const actionButtons = [
		{
			label     : 'Cancel',
			themeType : 'tertiary',
			onClick   : onClose,
		},
		{
			label     : 'Done',
			themeType : 'accent',
			onClick   : 'handleSubmit(onApply)',
		},
	];

	const user_chips = [
		{
			key      : '1',
			disabled : false,
			children : 'Student Name',
			prefix   : null,
			suffix   : null,
			tooltip  : false,
		},
		{
			key      : '2',
			children : 'Date of Completion',
			disabled : false,
			prefix   : null,
			suffix   : null,
			tooltip  : false,
		},
		{
			key      : '3',
			disabled : false,
			children : 'Grade',
			prefix   : null,
			suffix   : null,
			tooltip  : false,
			closable : true,
		},
	];
	const editable_chips = [
		{
			key      : '1',
			disabled : false,
			children : 'Certification Name',
			prefix   : null,
			suffix   : null,
			tooltip  : false,
		},
		{
			key      : '2',
			children : 'Authority',
			disabled : false,
			prefix   : null,
			suffix   : null,
			tooltip  : false,
		},
		{
			key      : '3',
			disabled : false,
			children : 'Sign',
			prefix   : null,
			suffix   : null,
			tooltip  : false,
			closable : true,
		},
	];

	return (
		<div className={styles.modal_content}>
			<Modal size="lg" show={show} onClose={onClose} placement="center">
				<Modal.Header title="Choose Certification Template" />
				<Modal.Body>
					<Select value={value} onChange={onChange} placeholder="Select" options={options} />
					<div className={styles.certificate_preview}>
						<IcMExpand className={styles.expand_btn} />
					</div>
					<div className={styles.footer}>
						<div className={styles.chips_container}>
							User Dependent Fields
							<Chips
								size="lg"
								enableMultiSelect
								items={user_chips}
								selectedItems={multiSelectedUser}
								onItemChange={setMultiSelectedUser}
								style={{ marginLeft: '12px' }}
							/>
						</div>
						<div className={styles.chips_container}>
							Editable Fields
							<Chips
								size="lg"
								enableMultiSelect
								items={editable_chips}
								selectedItems={multiSelectedEdit}
								onItemChange={setMultiSelectedEdit}
								style={{ marginLeft: '68px' }}
							/>
						</div>

					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.button_container}>
						{actionButtons.map((button) => (
							<Button
								key={button.label}
								size="sm"
								themeType={button.themeType}
								className={styles.action_buttons}
								onClick={button.onClick}
							>
								{button.label}
							</Button>
						))}
					</div>
				</Modal.Footer>
			</Modal>

		</div>
	);
}
