import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMTick } from '@cogoport/icons-react';
import React, { useState } from 'react';

// import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';
import NotesHrbp from '../common/notes-hr';
import Servicelist from '../common/services-list';

import DatePicker from './date-picker';
import OpenModal from './modal-div';
import styles from './styles.module.css';
import TermsConditions from './terms-conditions';
import useUpdateAdminClearanceData from './useUpdateAdminClearanceDetails';

function AdminClearance() {
	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
		watch,
	} = useForm();
	const [show, setShow] = useState(false);
	const l = watch();
	console.log(l);

	const { postAdminData } = useUpdateAdminClearanceData();
	// const { updateApplication } = useUpdateAppliationProcessDetails();

	const onSubmit = () => {
		console.log(control);
		setShow(true);
	};

	const handleModelSubmit = () => {
		const notes = [{
			label                  : 'notes for hrbp',
			Value                  : control.notes,
			Is_shared_with_manager : true,

		}];
		control.notes = notes;
		console.log(control);
		const payload = {
			sub_process_data      : control,
			sub_process_detail_id : '50adeb65-d63c-4c99-9a16-cd724ee4ca35',
			process_name          : 'admin_clearance',
		};
		postAdminData({
			payload,
		});
		setShow(false);
	};

	const handleClose = () => {
		setShow(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.containermain}>
				<div className={styles.title}>Admin Clareance</div>
				<div className={styles.subtitle}>Collection of company assets</div>
				<DatePicker control={control} errors={errors} />
				<Servicelist control={control} errors={errors} />
				<NotesHrbp control={control} errors={errors} />
			</div>
			<TermsConditions control={control} errors={errors} />
			<div className={styles.buttondiv}>

				<Button className={styles.adminbutton} onClick={() => handleSubmit(onSubmit)()}>
					Provide Clearance
					<IcMTick
						width={16}
						height={16}
					/>
				</Button>
			</div>
			<OpenModal show={show} onClose={handleClose} onSubmit={handleModelSubmit} />
		</div>
	);
}

export default AdminClearance;
