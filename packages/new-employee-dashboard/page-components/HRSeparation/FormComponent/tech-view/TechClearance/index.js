import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMTick, IcMError } from '@cogoport/icons-react';
import React, { useState } from 'react';

// import useGetApplicationProcessDetails from '../../useGetApplicationProcessDetails';
// import useSubmitTechClearance from '../useSubmitTechClearance';

import DatePicker from './DatePicker';
import ServiceList from './ServiceList';
import styles from './styles.module.css';
import TermsAndConditions from './TermsAndConditions';

function TechClearance() {
	const [showModal, setShowModal] = useState(false);
	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
	} = useForm();

	// const { data } = useGetApplicationProcessDetails();
	// const { postTechData } = useSubmitTechClearance();

	const onSubmit = (Values) => {
		// 	postTechData({
		// 		sub_process_data      : Values,
		// 		sub_process_detail_id : 'bce47a4f-5a4d-44e3-8f7c-dae20abba0a6',
		// 		process_name          : 'tech_clearance',
		// 	});
		console.log(Values);
		setShowModal(true);
	};

	return (
		<div className={styles.tech_container}>
			<div className={styles.title}>Access Removal</div>
			<div className={styles.sub_heading}>Check the boxes after removal of access</div>

			<DatePicker control={control} errors={errors} />
			<ServiceList control={control} errors={errors} />
			<TermsAndConditions control={control} errors={errors} />

			<div className={styles.provide_clearance_btn_container}>
				<Button
					size="md"
					themeType="primary"
					className={styles.provide_clearance_btn}
					onClick={() => {
						handleSubmit(onSubmit)();
					}}
				>
					Provide Clearance
					<IcMTick width="18px" height="18px" color="white" />
				</Button>
			</div>
			<Modal size="sm" show={showModal} onClose={() => setShowModal(false)}>
				<Modal.Body>
					<div className={styles.modal_icon_container}>
						<IcMError width="40px" height="40px" color="#C26D1A" />
					</div>
					<div className={styles.modal_message_container}>
						<div className={styles.modal_message_text}>
							<span className={styles.modal_msg_highlight}>
								Are you sure you want to provide clearance?
							</span>
							{' '}
							You can not make any changes after this point.
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						size="md"
						themeType="secondary"
						className={styles.cancel_modal_btn}
						onClick={() => setShowModal(false)}
					>
						Cancel
					</Button>
					<Button
						size="md"
						themeType="Accent"
						className={styles.proceed_modal_btn}
						onClick={() => setShowModal(false)}
					>
						Yes, Proceed
					</Button>
				</Modal.Footer>
			</Modal>
		</div>

	);
}

export default TechClearance;
