import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef } from 'react';

import getPersonalDetailControls from '../../../configurations/personalDetailControls';
import { getFieldController } from '../../../helper/getFieldController';

import styles from './styles.module.css';

function PersonalDetail(props, ref) {
	const personalDetailControls = getPersonalDetailControls();

	const {
		control,
		handleSubmit,
		register,
		formState:{ errors = {} },
	} = useForm();

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

				{personalDetailControls.map((config) => {
					const { name, type, label, rules } = config;
					const Element = getFieldController(type);
					const isMobileNo = type === 'mobileSelect';

					return (
						<div key={name} className={styles.col}>
							<p className={styles.label}>{label}</p>
							<Element
								{...config}
								control={control}
								mobileSelectRef={isMobileNo ? register(name, rules).ref : undefined}
							/>
							<p className={styles.error}>{errors?.[name]?.message || errors?.[name]?.type}</p>
						</div>
					);
				})}

				<div className={styles.footer}>
					<Button themeType="accent" onClick={handleSubmit(submitHandler)}>Send Quotation</Button>
				</div>
			</div>
		</div>
	);
}

export default forwardRef(PersonalDetail);
