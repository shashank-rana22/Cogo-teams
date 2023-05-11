import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { getFieldController } from '../../../../../../../commons/getFieldController';

import ConditionSelectComponent from './ConditionSelectComponent';
import { controls, selectControls } from './controls';
import styles from './styles.module.css';
import UploadComponent from './UploadComponent';

function CourseCompletion() {
	const {
		control,
		watch,
		formState: { errors = {} },
	} = useForm();

	const [value, onChange] = useState([]);
	const [show, setShow] = useState(false);
	const [multiSelectedUser, setMultiSelectedUser] = useState([]);
	const [multiSelectedEdit, setMultiSelectedEdit] = useState([]);
	const onClose = () => setShow(false);

	const options = [];

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

			<UploadComponent />
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
									console.log(subControlName, 'subControl');
									return (
										<div
											key={name}
											className={`${styles.form_group} ${styles[subControlName]}`}
										>

											<div className={`${styles.input_group} ${styles[subControlName]}`}>
												<SubControlElement
													{...controlItem}
													key={subControlName}
													control={control}
													id={`${subControlName}_input`}
												/>
											</div>

											{errors?.[subControlName]?.message ? (
												<div className={styles.error_message}>
													{errors?.[name]?.message}
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

export default CourseCompletion;
