import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useImperativeHandle, forwardRef, useEffect } from 'react';

import FormItem from '../../../common/FormItem';
import getPersonalDetailControls from '../../../configurations/personalDetailControls';

import styles from './styles.module.css';

function PersonalDetail(props, ref) {
	const { pocDetails = {} } = props;
	const personalDetailControls = getPersonalDetailControls();

	const formhook = useForm();
	const { setValue, handleSubmit } = formhook;

	const submitHandler = (data) => {
		console.log(data, 'data');
	};

	useImperativeHandle(ref, () => ({
		getPersonalDetails: () => new Promise((resolve) => {
			handleSubmit(
				(data) => resolve(data),
				(error) => resolve(error),
			)();
		}),
	}), [handleSubmit]);

	useEffect(() => {
		if (!isEmpty(pocDetails)) {
			setValue('firstName', pocDetails?.insuredFirstName);
			setValue('lastName', pocDetails?.insuredLastName);
			setValue('email', pocDetails?.email);
			setValue('phoneNo', { country_code: pocDetails?.phoneCode, number:	pocDetails?.phoneNo });
		}
	}, [pocDetails, setValue]);

	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				<h3>Personal Details</h3>
			</div>

			<div className={styles.form_container}>
				<h3 className={styles.form_title}>Insurance Quotation</h3>

				<FormItem formhook={formhook} controls={personalDetailControls} />

				<div className={styles.footer}>
					<Button themeType="accent" onClick={handleSubmit(submitHandler)}>Send Quotation</Button>
				</div>
			</div>
		</div>
	);
}

export default forwardRef(PersonalDetail);
