import { Button, Modal, Select, Chips } from '@cogoport/components';
import { IcMExpand } from '@cogoport/icons-react';

import { EDITABLE_ITEMS, USER_ITEMS, BUTTON_MAPPING } from './config';
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
								items={USER_ITEMS}
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
								items={EDITABLE_ITEMS}
								selectedItems={multiSelectedEdit}
								onItemChange={setMultiSelectedEdit}
								style={{ marginLeft: '68px' }}
							/>
						</div>

					</div>
				</Modal.Body>

				<Modal.Footer>
					<div className={styles.button_container}>
						{BUTTON_MAPPING.map((button) => (
							<Button
								key={button.label}
								size="sm"
								themeType={button.themeType}
								className={styles.action_buttons}
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
