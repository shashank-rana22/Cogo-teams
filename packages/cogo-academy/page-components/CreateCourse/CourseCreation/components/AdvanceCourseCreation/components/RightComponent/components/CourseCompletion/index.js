import { isEmpty } from '@cogoport/utils';
import { forwardRef } from 'react';

import { getFieldController } from '../../../../../../../../../commons/getFieldController';

import { controls, selectControls } from './controls';
import styles from './styles.module.css';
import UploadComponent from './UploadComponent';
import useHandleCourseCompletion from './useHandleCourseCompletion';

function CourseCompletion({ data = {}, id = '', activeTab, state }, ref) {
	const {
		errors,
		control,
		isTestPresent,
	} = useHandleCourseCompletion({ data, ref, state, id, activeTab });

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const {
					name,
					label,
					type,
					subControls = [],
					subLabel = '',
				} = controlItem || {};

				if (type === 'groupSelect') {
					return (
						<div key={name} className={styles.group_container}>
							<div
								className={`${styles.group_select_container} ${styles[name]}`}
							>
								{subControls.map((subControlItem) => {
									const {
										name: subControlName,
										label: subControlLabel,
										type: subControlType,
									} = subControlItem || {};

									const SubControlElement = getFieldController(subControlType);

									return (
										<div
											key={subControlName}
											className={`${styles.form_group} ${styles[subControlName]}`}
										>
											{isTestPresent
											|| subControlName !== 'test_id' ? (
												<div className={styles.label}>
													{subControlLabel}
													<sup className={styles.superscipt}>*</sup>
												</div>
												) : null}

											<div
												className={`${styles.input_group} ${styles[subControlName]}`}
											>
												{subControlName !== 'test_id'
												|| (isTestPresent
													&& subControlName === 'test_id') ? (
														<SubControlElement
															{...subControlItem}
															key={subControlName}
															control={control}
															id={`${subControlName}_input`}
														/>
													) : null}
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

							{/* <ConditionSelectComponent   REQUIRED IN FUTURE
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

						{!isEmpty(subLabel) ? (
							<div className={styles.sub_label}>{subLabel}</div>
						) : null}

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
					const { label, subControls = [] } = controlItem || {};

					return (
						<>
							<div className={styles.label}>
								{label}
								<sup className={styles.superscipt}>*</sup>
							</div>

							<div className={styles.select_group}>
								{subControls.map((subControlItem) => {
									const { name: subControlName, type: subControlType } = subControlItem || {};
									const SubControlElement = getFieldController(subControlType);

									return (
										<div
											key={subControlName}
											className={`${styles.form_group} ${styles[subControlName]}`}
										>
											<div
												className={`${styles.input_group} ${styles[subControlName]}`}
											>
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
