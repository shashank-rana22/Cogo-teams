/* eslint-disable no-nested-ternary */
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useImperativeHandle, forwardRef, useEffect } from 'react';

import { getFieldController } from '../../../../../../../../../commons/getFieldController';
import CURRENT_TO_NEXT_MAPPING from '../../Header/CURRENT_TO_NEXT_MAPPING';

// import ConditionSelectComponent from './ConditionSelectComponent';
import { controls, selectControls } from './controls';
import styles from './styles.module.css';
import UploadComponent from './UploadComponent';

const MAPPING = ['completion_criteria', 'completion_message', 'course_completion_rewards_details', 'test_id'];

const CERTIFICATE_MAPPING = ['certificate_name', 'signing_authority_sign_url', 'signing_authority_user_id'];

function CourseCompletion({ data = {}, id = '', activeTab, state }, ref) {
	const {
		control,
		formState: { errors = {} },
		watch,
		handleSubmit,
		setValue,
	} = useForm();

	// const [value, onChange] = useState([]);
	// const [show, setShow] = useState(false);
	// const [multiSelectedUser, setMultiSelectedUser] = useState([]);
	// const [multiSelectedEdit, setMultiSelectedEdit] = useState([]);

	// const onClose = () => setShow(false);

	// const options = [];

	const watchData = watch();
	const Criteria = watchData?.completion_criteria || [];

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
					test_id,
				} = values || {};

				return {
					hasError : false,
					values   : {
						id,
						completion_message,
						course_completion_rewards_details,
						test_ids:
						(Criteria.includes('test') || Criteria.includes('timed_test')) ? [test_id] : null,
						course_completion_duration: {
							course_completion_value: Number(course_completion_value),
							course_completion_unit,
						},
						certificate_params: {
							signing_authority_user_id,
							signing_authority_sign_url: signing_authority_sign_url.finalUrl,
							certificate_name,
						},
						completion_criteria,
						...(state !== 'published' ? { state: CURRENT_TO_NEXT_MAPPING[activeTab] } : {}),
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
			const { course_completion_duration, course_certificates = [], tests = [] } = data || {};

			const { course_completion_unit, course_completion_value } = course_completion_duration || {};

			if (!isEmpty(course_certificates)) {
				const certificateData = course_certificates[0];

				CERTIFICATE_MAPPING.forEach((item) => {
					if (certificateData[item] && !isEmpty(certificateData[item])) {
						setValue(item, certificateData[item]);
					}
				});
			}

			MAPPING.forEach((item) => {
				if (data[item] && !isEmpty(data[item])) {
					setValue(item, data[item]);
				}

				if (item === 'test_id' && !isEmpty(tests[0])) {
					setValue('test_id', tests[0].id);
				}
			});

			setValue('course_completion_unit', course_completion_unit);

			setValue('course_completion_value', course_completion_value ? course_completion_value.toString() : '');
		}
	}, [data, setValue]);

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { name, label, type, subControls = [], subLabel = '' } = controlItem || {};

				if (type === 'groupSelect') {
					return (
						<div key={name} className={styles.group_container}>
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
											{ (Criteria.includes('test')
												|| Criteria.includes('timed_test'))
												? (
													<div className={styles.label}>
														{subControlLabel}
														<sup className={styles.superscipt}>*</sup>
													</div>
												) : (
													(subControlName
														=== 'test_id') ? null : (
															<div className={styles.label}>
																{subControlLabel}
																<sup className={styles.superscipt}>*</sup>
															</div>
														)
												)}

											<div className={`${styles.input_group} ${styles[subControlName]}`}>
												{!(Criteria.includes('test')
												|| Criteria.includes('timed_test'))
													? 	null : subControlName === 'test_id' ? (
														<SubControlElement
															{...subControlItem}
															key={subControlName}
															control={control}
															id={`${subControlName}_input`}
														/>
													)
														: null}
												{ !(subControlName === 'test_id') ? (
													<SubControlElement
														{...subControlItem}
														key={subControlName}
														control={control}
														id={`${subControlName}_input`}
													/>
												)
													: null}
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

							{/* <ConditionSelectComponent
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
							/> */}
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
