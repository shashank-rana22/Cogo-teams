import { Button, Modal } from '@cogoport/components';
import {
	CheckboxGroupController,
} from '@cogoport/forms';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function ServiceList({ control = {}, errors = {} }) {
	const [show, setShow] = useState(false);
	const [newService, setNewService] = useState('');
	const [showModal, setShowModal] = useState(false);

	const [SERVICE_CHECKBOX_LIST, setServiceCheckboxList] = useState([
		{ label: 'Cloud Services', value: 'Cloud_Services' },
		{ label: 'Atlassian', value: 'Atlassian' },
		{ label: 'Figma', value: 'Figma' },
		{ label: 'Github', value: 'Github' },
	]);

	const addNewService = () => {
		if (newService.trim() !== '') {
			const newServiceObject = { label: newService, value: newService };
			setServiceCheckboxList([...SERVICE_CHECKBOX_LIST, newServiceObject]);
		}
		setNewService('');
	};
	return (
		<div className={styles.container}>

			<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
				<span>
					Service List
				</span>
				<div className={styles.button_add_service_container}>
					<Button
						onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
						className={styles.add_service_button}
						size="md"
						themeType="secondary"

					>
						+ Add Service
					</Button>
					<IcMArrowDown
						width={16}
						height={16}
						className={show ? styles.caret_active : styles.caret_arrow}
					/>
				</div>
			</div>
			<div className={show ? styles.item_container : styles.item_container_closed}>

				<CheckboxGroupController
					control={control}
					errors={errors}
					options={SERVICE_CHECKBOX_LIST}
					className={styles.check_box_controller}
					name="service_list"
				/>
				<Modal size="sm" show={showModal} onClose={() => setShowModal(false)}>
					<Modal.Body>
						<div className={styles.modal_message_container}>
							<div className={styles.modal_message_text}>
								<input
									type="text"
									placeholder="Enter a new service"
									value={newService}
									onChange={(e) => setNewService(e.target.value)}
								/>
							</div>
						</div>

					</Modal.Body>
					<Modal.Footer>

						<Button
							className={styles.add_service_button}
							size="md"
							themeType="primary"
							onClick={() => { addNewService(); setShowModal(false); }}
						>
							Add
						</Button>

					</Modal.Footer>
				</Modal>
				{/* <div className={styles.add_service_input_container}>
					<input
						type="text"
						placeholder="Enter a new service"
						value={newService}
						onChange={(e) => setNewService(e.target.value)}
					/>
					<Button
						className={styles.add_service_button}
						size="md"
						themeType="primary"
						onClick={addNewService}
					>
						Add
					</Button>
				</div> */}
			</div>
		</div>
	);
}

export default ServiceList;
