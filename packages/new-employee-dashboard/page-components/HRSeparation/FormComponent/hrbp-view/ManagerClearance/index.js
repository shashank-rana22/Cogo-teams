import { Button, Tags } from '@cogoport/components';
import { InputController, useForm, AsyncSelectController, DatepickerController } from '@cogoport/forms';
import { IcMTaskCompleted, IcCFtick, IcMCalendar, IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

const options = [
	{
		key      : '1',
		disabled : false,
		children : 'Completed',
		color    : 'green',
		tooltip  : false,
	},
];

function ManagerClearance() {
	const [items, setItems] = useState(options);
	const {
		control,
		watch,
		formState:{ errors = {} },
	} = useForm();

	const formValues = watch();

	console.log('formValues', formValues);

	// useEffect(() => {
	// 	setValue('handover_by', '588864fa-40dc-510f-4817-ef4540c2d11e');
	// }, []);

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left_header}>
					<span className={styles.upper_text}>HR MEETING</span>
					<span className={styles.lower_text}>Summary from manager interaction</span>
				</div>
				<div className={styles.logs_button}>
					<Tags items={items} onItemsChange={setItems} size="xl" />
					<Button size="md" themeType="accent">
						<IcMTaskCompleted />
						<span style={{ marginLeft: '4px' }}>Notes & Logs</span>
					</Button>
				</div>
			</div>

			<div className={styles.sub_heading}>
				<IcCFtick width={20} height={20} />
				<span style={{ marginLeft: '10px' }}>Cleared by Person/Team Name</span>
			</div>

			<div className={styles.container}>
				<div className={styles.heading}>
					Feedback Rating
				</div>
				<InputController
					control={control}
					name="feedback_rating"
					size="md"
					style={{ marginRight: '8px' }}
					placeholder="Typed"
				/>
			</div>

			<div className={styles.container}>
				<div className={styles.heading}>
					Status
				</div>

				<div className={styles.input_fields}>
					<div className={styles.inputs}>
						<div className={styles.status}>
							<span>Handover By</span>
							<span className={styles.star}>*</span>
						</div>
						<AsyncSelectController
							name="handover_by"
							asyncKey="list_employees"
							placeholder="Type to search..."
							valueKey="user_id"
							initialCall={false}
							control={control}
							params={{
								filters: {
									employee_status: ['probation', 'confirmed'],
								},
							}}
							size="md"
							isClearable
							prefix={<IcMCalendar />}
						/>
						{errors.handover_by && (
							<span className={styles.error}>*This field is Required</span>
						)}
					</div>
					<div className={styles.inputs}>
						<div className={styles.status}>
							<span>Takeover By</span>
							<span className={styles.star}>*</span>
						</div>
						<AsyncSelectController
							name="takeover_by"
							asyncKey="list_employees"
							placeholder="Type to search..."
							valueKey="user_id"
							initialCall={false}
							control={control}
							params={{
								filters: {
									employee_status: ['probation', 'confirmed'],
								},
							}}
							size="md"
							isClearable
							prefix={<IcMCalendar />}
						/>
						{errors.takeover_by && (
							<span className={styles.error}>*This field is Required</span>
						)}

					</div>

				</div>

				<div className={styles.status}>
					<span>
						Additional Remarks
					</span>
					<span className={styles.manager_text}>
						(if any)
					</span>
				</div>

				<InputController
					control={control}
					name="additional_remarks"
					size="md"
					style={{ marginRight: '8px' }}
					placeholder="Typed"
				/>
			</div>

			<div className={styles.container}>
				<div className={styles.heading}>
					Suggest Last Working Day
				</div>
				<DatepickerController
					control={control}
					name="last_working_day"
					size="md"
					style={{ marginRight: '8px' }}
					placeholder="Select Date"
					suffix={<IcMArrowDown />}
				/>
			</div>

			<div className={styles.container}>
				<div className={styles.heading}>
					Notes shared with you
				</div>
				<InputController
					control={control}
					name="notes_shared"
					size="md"
					style={{ marginRight: '8px' }}
					placeholder="Typed"
				/>

				<div className={styles.footer}>
					<Button themeType="secondary" style={{ marginRight: '4px' }}>Save</Button>
					<Button themeType="primary">Make Changes</Button>
				</div>
			</div>
		</>
	);
}

export default ManagerClearance;
