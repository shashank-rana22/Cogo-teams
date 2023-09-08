import { Button, Checkbox } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMArrowRight, IcMFtick } from '@cogoport/icons-react';
import React from 'react';

import ResignEmployeeDetails from '../commons/ResignEmployeeDetails';

import CommunicationMode from './CommunicationMode';
import DatePicker from './DatePicker';
import styles from './styles.module.css';

function ResignationFormLanding() {
	const RESIGN_SUBMITTED = true;

	const {
		control,
		formState:{ errors = {} },
	} = useForm();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>
					<div className={styles.title}>SEPARATION FORM</div>
					<div className={styles.sub_heading}>Please fill the information carefully</div>
				</div>
				{RESIGN_SUBMITTED && (
					<Button size="md" themeType="secondary">
						Request Cancellation
					</Button>
				)}

			</div>
			{RESIGN_SUBMITTED && (
				<div className={styles.pop_up_container}>
					<IcMFtick height={18} width={18} color="#849E4C" />
					<span className={styles.pop_up_content}>
						You application has been successfully
						forwarded to the HR Department. You will soon hear from the respective HR.
					</span>
				</div>
			)}
			<ResignEmployeeDetails />
			<CommunicationMode />
			<DatePicker control={control} errors={errors} />
			<div className={styles.check_box_notice}>
				<Checkbox className={styles.check_box_notice_icon} />
				<span className={styles.check_box_text}>
					By clicking on Initiate Separation,
					you agree to serve your notice period per your
					employment contract. Per your employment contract, your LWD is &apos;dd/mm/yyyy&apos;
				</span>
			</div>
			<div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: '4px' }}>Cancel</Button>
				<Button themeType="primary">
					Initiate Separation
					<IcMArrowRight width={16} height={16} style={{ marginLeft: '4px' }} />

				</Button>
			</div>
		</div>
	);
}

export default ResignationFormLanding;
