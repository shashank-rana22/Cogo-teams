import { Button, Modal, Tags } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMTick, IcMError, IcMFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';

import DatePicker from './DatePicker';
import ServiceList from './ServiceList';
import styles from './styles.module.css';
import TechStatus from './TechStatus';
import TermsAndConditions from './TermsAndConditions';

const OPTIONS = [
	{
		key      : '1',
		disabled : false,
		children : 'Completed',
		prefix   : null,
		suffix   : null,
		color    : '#849E4C',
		tooltip  : false,
	},
];

function TechClearance({ data = {}, refetch = () => {} }) {
	const [showModal, setShowModal] = useState(false);

	const [items, setItems] = useState(OPTIONS);
	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
		setValue,
	} = useForm();

	const { tech_clearance } = data || {};
	const { tech_clearance:techClearance } = tech_clearance || {};
	const { sub_process_detail_id } = techClearance || {};

	const TECH_CLEARANCE_STATUS = techClearance?.is_complete;

	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch });

	const onSubmit = (values = {}) => {
		const payload = {
			process_name     : 'tech_clearance',
			sub_process_detail_id,
			sub_process_data : {
				lastWorkingDay : values.date,
				serviceList    : values.service_list,
				checkDetails   : values.check_details,
				name           : values.full_name,
			},
		};
		updateApplication({ payload });
	};

	return (
		<div className={styles.tech_container}>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div className={styles.title}>Access Removal</div>
					<div className={styles.sub_heading}>Check the boxes after removal of access</div>
				</div>
				{TECH_CLEARANCE_STATUS
				&& (
					<Tags
						items={items}
						onItemsChange={setItems}
						size="xl"
						className={styles.completed}
					/>
				)}
			</div>

			{TECH_CLEARANCE_STATUS
			&& (
				<>
					<div className={styles.completed_notification_container}>
						<IcMFtick height="18px" width="18px" color="#849E4C" />
						<div className={styles.completed_notification_text}>
							You have successfully completed your tasks. No further changes are allowed
						</div>
					</div>
					<TechStatus
						techClearance={techClearance}
					/>
				</>
			)}

			{!TECH_CLEARANCE_STATUS
			&& 			(
				<>
					<DatePicker
						control={control}
						errors={errors}
						setValue={setValue}
						dataItems={data}
					/>
					<ServiceList control={control} errors={errors} />
					<TermsAndConditions control={control} errors={errors} techClearance={techClearance} />
					<div className={styles.provide_clearance_btn_container}>
						<Button
							size="md"
							themeType="primary"
							className={styles.provide_clearance_btn}
							onClick={() => setShowModal(true)}
						>
							Provide Clearance
							<IcMTick width="18px" height="18px" color="white" />
						</Button>
					</div>
				</>
			)}

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
						themeType="primary"
						className={styles.proceed_modal_btn}
						onClick={() => {
							handleSubmit(onSubmit)();
							setShowModal(false);
						}}
					>
						Yes, Proceed
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default TechClearance;
