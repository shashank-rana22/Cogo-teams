import { Select, Button, Loader } from '@cogoport/components';
import { useForm, TimepickerController } from '@cogoport/forms';
import { useState, useEffect, useMemo } from 'react';

import { CONTROLS, SHIFT_CONFIGURATION_HEADING, teamsOption } from '../../../../../../constants/shiftsMapping';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../constants/viewTypeMapping';
import { transformShiftData, validateTime } from '../../../../../../helpers/shiftConfigurationHelpers';
import useCreateBulkCogooneShift from '../../../../../../hooks/useCreateBulkCogooneShift';
import useListCogooneShiftConfiguration from '../../../../../../hooks/useListCogooneShiftConfiguration';
import useUpdateCogooneShift from '../../../../../../hooks/useUpdateCogooneShift';
import getDefaultValues from '../../../../../../utils/getDefaultValues';

import styles from './styles.module.css';

function ShiftConfiguration({ handleClose = () => {}, viewType = '' }) {
	const [selectedTeam, setSelectedTeam] = useState(
		VIEW_TYPE_GLOBAL_MAPPING[viewType]?.shift_view_default_type || '',
	);
	const {
		shiftsData = {},
		shiftDataLoading = false,
	} = useListCogooneShiftConfiguration({ selectedTeam });

	const { createUpdateRequest = () => {} } = useUpdateCogooneShift();

	const { createCogooneShiftRequest = () => {} } = useCreateBulkCogooneShift({ handleClose });

	const { list = [] } = shiftsData || {};

	const defaultValues = useMemo(() => getDefaultValues({ list, selectedTeam }), [selectedTeam, list]);

	const toShowSelect = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.shift_configuration_select;

	const {
		control, setValue, handleSubmit, watch, formState:{ errors = {}, isDirty },
	} = useForm({});

	const onSubmit = async (val) => {
		const formattedValues = transformShiftData({ val, list });
		await createUpdateRequest({ formattedValues: [...formattedValues], prevList: list });
		createCogooneShiftRequest({ team_name: selectedTeam, formattedValues });
	};

	useEffect(() => {
		Object.entries(defaultValues).forEach(([key, value]) => {
			setValue(key, value);
		});
	}, [setValue, defaultValues]);

	const formValues = watch();

	const handleValidate = ({ value, name }) => {
		const [phase, type] = name.split('_shift_');
		if (type === 'start_time') {
			return validateTime({ start_time: value, end_time: formValues[`${phase}_shift_end_time`] });
		}
		return validateTime({ start_time: formValues[`${phase}_shift_start_time`], end_time: value });
	};

	return (
		<div className={styles.container}>
			{toShowSelect ? (
				<div className={styles.select_container}>
					<Select
						value={selectedTeam}
						onChange={setSelectedTeam}
						placeholder="Select Teams"
						options={teamsOption}
						size="sm"
						className={styles.select_teams}
					/>
				</div>
			) : null}

			{shiftDataLoading
				? (
					<div className={styles.loading}>
						<Loader themeType="primary" />
					</div>
				)
				: (
					<>
						<div className={styles.heading}>
							{SHIFT_CONFIGURATION_HEADING.map((item) => (
								<div key={item.key}>
									{item.label}
								</div>
							))}
						</div>
						<div className={styles.mid_section}>
							{CONTROLS.map(({ id, label, key, fields }) => (
								<div key={key} className={styles.shift_details}>
									<p>{label}</p>
									<div className={styles.control_fields}>
										{fields.map((name) => (
											<div key={`${id}_${name}`}>
												<TimepickerController
													placeholder="Select time"
													control={control}
													name={`${name}`}
													maxDate={new Date()}
													rules={{
														validate: (value) => (handleValidate({ value, name })
															? true
															: 'Start Time should be less than End Time'),
													}}
												/>
												{errors && errors[name] && (
													<div className={styles.error}>{errors[name].message}</div>
												)}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</>
				)}

			<div className={styles.button_section}>
				<Button
					size="md"
					themeType="tertiary"
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(onSubmit)}
					disabled={shiftDataLoading || !isDirty}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}
export default ShiftConfiguration;
