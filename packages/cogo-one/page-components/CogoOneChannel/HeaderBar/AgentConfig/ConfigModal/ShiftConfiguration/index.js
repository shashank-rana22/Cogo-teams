import { Select, Button, Loader, Toast } from '@cogoport/components';
import { useForm, TimepickerController } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

import { CONTROLS, SHIFT_CONFIGURATION_HEADING, teamsOption } from '../../../../../../constants/shiftsMapping';
import useCreateBulkCogooneShift from '../../../../../../hooks/useCreateBulkCogooneShift';
import useListCogooneShift from '../../../../../../hooks/useListCogooneShift';
import useUpdateCogooneShift from '../../../../../../hooks/useUpdateCogooneShift';
import getDefaultValues from '../../../../../../utils/getDefaultValues';

import styles from './styles.module.css';

const compareTime = (start_time, end_time) => {
	if (start_time && end_time
		&& (Number(start_time.getHours()) <= Number(end_time.getHours()))
		&& (
			Number(start_time.getHours()) !== Number(end_time.getHours())
			|| Number(start_time.getMinutes()) <= Number(end_time.getMinutes())
		)
	) { return true; }
	return false;
};

function ShiftConfiguration({ handleClose = () => {}, viewType = '' }) {
	const [selectedTeam, setSelectedTeam] = useState('shipment_specialist');
	const [submissionState, setSubmissionState] = useState({});
	const {
		getListShift = () => {},
		shiftsData = {},
		shiftDataLoading = false,
	} = useListCogooneShift({ selectedTeam });

	const { createUpdateRequest = () => {} } = useUpdateCogooneShift({ getListShift });

	const { createCogooneShiftRequest = () => {} } = useCreateBulkCogooneShift();

	const { list = [] } = shiftsData || {};

	const defaultValues = useMemo(() => getDefaultValues({ list, selectedTeam }), [selectedTeam, list]);

	const toShowSelect = viewType === 'cogoone_admin';
	const isShipmentSpecialist = viewType === 'shipment_specialist';

	const {
		control, setValue, handleSubmit, watch,
	} = useForm({});

	const onSubmit = (val) => {
		const NEW_OBJ = {};
		Object.entries(val).forEach(([key, time]) => {
			const [shift_name, time_key] = key.split('_shift_');
			NEW_OBJ[shift_name] = {
				...NEW_OBJ[shift_name],
				shift_name,
				[`${time_key}_local`]: time,
			};
		});
		(list || []).forEach((itm) => {
			const { id: shiftId, shift_name = '' } = itm || {};
			if (shift_name in NEW_OBJ) {
				NEW_OBJ[shift_name].shift_id = shiftId;
			}
		});
		const formattedValues = Object.values(NEW_OBJ);
		if (
			!createUpdateRequest({ formattedValues: [...formattedValues], prevList: list })
		&&	!createCogooneShiftRequest({
			team_name: isShipmentSpecialist
				? 'shipment_specialist' : selectedTeam,
			formattedValues,
		})) {
			Toast.error('No changes triggered...');
		}
	};

	useEffect(() => {
		Object.entries(defaultValues).forEach(([key, value]) => {
			setValue(key, value);
		});
	}, [setValue, defaultValues]);

	const formValues = watch();

	const validateTime = (start_time, end_time) => {
		if (!start_time && !end_time) return true;
		if (
			!compareTime(start_time, end_time)
		) {
			Toast.error('Start Time should be less than End Time');
			return false;
		}
		return true;
	};

	const handleChange = (val, name) => {
		const [phase, type] = name.split('_shift_');
		let flag = true;
		if (type === 'start_time') {
			flag = validateTime(val, formValues[`${phase}_shift_end_time`]);
		} else {
			flag = validateTime(formValues[`${phase}_shift_start_time`], val);
		}
		setSubmissionState((prev) => ({ ...prev, [phase]: flag }));
	};

	const isSubmitAllowed = () => {
		if (isEmpty(submissionState)) return false;
		return Object.values(submissionState).reduce((res, itm) => res && itm, true);
	};

	return (
		<div className={styles.container}>
			{toShowSelect ? (
				<div className={styles.select_container}>
					<Select
						value={selectedTeam}
						onChange={(val) => setSelectedTeam(val)}
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
													onChange={handleChange}
												/>
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
					disabled={shiftDataLoading || !isSubmitAllowed()}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}
export default ShiftConfiguration;
