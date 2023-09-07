import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMTick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import AdminClearMain from './admin-clear-main';
import OpenModal from './modal-div';
import styles from './styles.module.css';
import TermsConditions from './terms-conditions';

function AdminClearance() {
	const {
		control,
		formState:{ errors = {} },
	} = useForm();
	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
	};

	return (
		<div className={styles.container}>
			<AdminClearMain control={control} errors={errors} />
			<TermsConditions />
			<div className={styles.buttondiv}>

				<Button className={styles.adminbutton} onClick={() => setShow(true)}>
					Provide Clearance
					<IcMTick
						width={16}
						height={16}
					/>
				</Button>
			</div>
			<OpenModal show={show} onClose={handleClose} />
		</div>
	);
}

export default AdminClearance;
