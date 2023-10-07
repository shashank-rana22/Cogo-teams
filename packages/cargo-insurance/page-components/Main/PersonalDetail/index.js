import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef } from 'react';

import FormItem from '../../../common/FormItem';
import getPersonalDetailControls from '../../../configurations/personalDetailControls';

import styles from './styles.module.css';

function PersonalDetail(props, ref) {
	const personalDetailControls = getPersonalDetailControls();

	const formhook = useForm();
	const { handleSubmit } = formhook;

	const submitHandler = (data) => {
		console.log(data, 'data');
	};

	useImperativeHandle(ref, () => ({
		getPersonalDetails: () => {
			const onSubmit = (data) => data;
			const onError = (data) => data;

			return new Promise((resolve) => {
				handleSubmit(
					(data) => resolve(onSubmit(data)),
					(err) => resolve(onError(err)),
				)();
			});
		},
	}), [handleSubmit]);

	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				<h3>Personal Details</h3>
				<Button size="sm" themeType="secondary">Add New</Button>
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
