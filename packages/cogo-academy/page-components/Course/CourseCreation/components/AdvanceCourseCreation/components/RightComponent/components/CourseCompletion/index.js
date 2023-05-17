import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';

import { getFieldController } from '../../../../../../../commons/getFieldController';

import ConditionSelectComponent from './ConditionSelectComponent';
import { controls, selectControls } from './controls';
import styles from './styles.module.css';
import UploadComponent from './UploadComponent';

function CourseCompletion({ data = {}, id = '' }, ref) {
	const {
		control,
		formState: { errors = {} },
		watch,
		handleSubmit,
		setValue,
	} = useForm();

	const [value, onChange] = useState([]);
	const [show, setShow] = useState(false);
	const [multiSelectedUser, setMultiSelectedUser] = useState([]);
	const [multiSelectedEdit, setMultiSelectedEdit] = useState([]);

	const onClose = () => setShow(false);

	const options = [];

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (values) => {
				const {
					completion_message,
					completion_criteria,
					certificate_name,
					signing_authority_user_id,
					signing_authority_sign_url,
					course_completion_value,
					course_completion_unit,
					course_completion_rewards_details = [],
				} = values || {};

				return {
					hasError : false,
					values   : {
						id,
						completion_message,
						course_completion_rewards_details,
						course_completion_duration: {
							course_completion_value,
							course_completion_unit,
						},
						certificate_params: {
							signing_authority_user_id,
							signing_authority_sign_url: signing_authority_sign_url.finalUrl,
							certificate_name,
						},
						completion_criteria,
					},
				};
			};

			const onError = (error) => ({ hasError: true, error });

			return new Promise((resolve) => {
				handleSubmit(
					(values) => resolve(onSubmit(values)),
					(error) => resolve(onError(error)),
				)();
			});
		},
	}));

	useEffect(() => {
		if (!isEmpty(data)) {
			const { course_completion_duration = {} } = data || {};

			const { course_completion_unit, course_completion_value } = course_completion_duration;

			setValue('completion_criteria', data.completion_criteria);
			setValue('completion_message', data.completion_message);
			setValue('course_completion_rewards_details', data.course_completion_rewards_details);
			setValue('course_completion_unit', course_completion_unit);
			setValue('course_completion_value', course_completion_value);
		}
	}, [data, setValue]);

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { name, label, type, subControls = [], subLabel = '' } = controlItem || {};

				if (type === 'groupSelect') {
					return (
						<div className={styles.group_container}>
							<div className={`${styles.group_select_container} ${styles[name]}`}>
								{subControls.map((subControlItem) => {
									const {
										name:subControlName,
										label:subControlLabel,
										type:subControlType,
									} = subControlItem || {};

									const SubControlElement = getFieldController(subControlType);

									return (
										<div
											key={subControlName}
											className={`${styles.form_group} ${styles[subControlName]}`}
										>
											<div className={styles.label}>
												{subControlLabel}
												<sup className={styles.superscipt}>*</sup>
											</div>

											<div className={`${styles.input_group} ${styles[subControlName]}`}>
												<SubControlElement
													{...subControlItem}
													key={subControlName}
													control={control}
													id={`${subControlName}_input`}
												/>
											</div>

											{errors?.[subControlName]?.message ? (
												<div className={styles.error_message}>
													{errors?.[subControlName]?.message}
												</div>
											) : null}

										</div>
									);
								})}
							</div>

							<ConditionSelectComponent
								options={options}
								onClose={onClose}
								multiSelectedEdit={multiSelectedEdit}
								multiSelectedUser={multiSelectedUser}
								setMultiSelectedUser={setMultiSelectedUser}
								setMultiSelectedEdit={setMultiSelectedEdit}
								show={show}
								setShow={setShow}
								value={value}
								onChange={onChange}
								watch={watch}
							/>
						</div>
					);
				}
				const Element = getFieldController(type);

				if (!Element) return null;

				return (
					<div key={name} className={`${styles.form_group} ${styles[name]}`}>
						<div className={styles.label}>
							{label}
							<sup className={styles.superscipt}>*</sup>
						</div>

						<div className={`${styles.input_group} ${styles[name]}`}>
							<Element
								{...controlItem}
								key={name}
								control={control}
								id={`${name}_input`}
							/>
						</div>

						{!isEmpty(subLabel) ? <div className={styles.sub_label}>{subLabel}</div> : null}

						{errors?.[name]?.message ? (
							<div className={styles.error_message}>
								{errors?.[name]?.message}
							</div>
						) : null}
					</div>
				);
			})}

			<UploadComponent control={control} errors={errors} />

			<div className={`${styles.select_container}`}>
				{selectControls.map((controlItem) => {
					const { name, label, subControls = [] } = controlItem || {};

					return (
						<>
							<div className={styles.label}>
								{label}
								<sup className={styles.superscipt}>*</sup>
							</div>
							<div className={styles.select_group}>

								{subControls.map((subControlItem) => {
									const {
										name:subControlName,
										type:subControlType,
									} = subControlItem || {};
									const SubControlElement = getFieldController(subControlType);

									return (
										<div
											key={name}
											className={`${styles.form_group} ${styles[subControlName]}`}
										>
											<div className={`${styles.input_group} ${styles[subControlName]}`}>
												<SubControlElement
													{...subControlItem}
													key={subControlName}
													control={control}
													id={`${subControlName}_input`}
												/>
											</div>

											{errors?.[subControlName]?.message ? (
												<div className={styles.error_message}>
													{errors?.[subControlName]?.message}
												</div>
											) : null}
										</div>
									);
								})}
							</div>
						</>
					);
				})}

			</div>
		</div>
	);
}

export default forwardRef(CourseCompletion);
