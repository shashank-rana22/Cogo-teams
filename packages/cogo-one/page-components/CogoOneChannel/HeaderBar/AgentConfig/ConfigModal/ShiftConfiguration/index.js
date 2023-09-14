import { Select, Button, Loader } from '@cogoport/components';
import { useForm, TimepickerController } from '@cogoport/forms';
import { useState, useEffect, useMemo } from 'react';

import { CONTROLS, SHIFT_CONFIGURATION_HEADING, teamsOption } from '../../../../../../constants/shiftsMapping';
import useCreateBulkCogooneShift from '../../../../../../hooks/useCreateBulkCogooneShift';
import useListCogooneShift from '../../../../../../hooks/useListCogooneShift';
import useUpdateCogooneShift from '../../../../../../hooks/useUpdateCogooneShift';
import getDefaultValues from '../../../../../../utils/getDefaultValues';

import styles from './styles.module.css';

function ShiftConfiguration({ handleClose = () => {}, viewType = '' }) {
	const [selectedTeam, setSelectedTeam] = useState('shipment_specialist');
	// const [defaultValues, setDefaultValues] = useState({});

	const {
		getListShift = () => {},
		shiftsData = {},
		shiftDataLoading = false,
	} = useListCogooneShift({ selectedTeam });

	const { createUpdateRequest = () => {} } = useUpdateCogooneShift({ getListShift });

	const { createCogooneShift = () => {} } = useCreateBulkCogooneShift();

	const { list = [] } = shiftsData || {};

	const defaultValues = useMemo(() => getDefaultValues({ list, selectedTeam }), [selectedTeam, list]);

	const toShowSelect = viewType === 'cogoone_admin';

	const {
		control, setValue, handleSubmit,
		// formState:{ errors = {} },
		watch,
	} = useForm({});
	console.log('watch:', watch());

	const onSubmit = (val) => {
		const formattedValues = (list || []).map((itm) => {
			const { id: shiftId, shift_name = '', status = 'inactive' } = itm || {};
			return {
				shift_id         : status === 'active' ? shiftId : null,
				start_time_local : val[`${shift_name}_shift_start_time`] || new Date(),
				end_time_local   : val[`${shift_name}_shift_end_time`] || new Date(),
			};
		});
		createUpdateRequest({ formattedValues, prevList: list });

		createCogooneShift({ formattedValues, prevList: list });
	};

	// useEffect(() => {
	// 	setDefaultValues(getDefaultValues({ list }));
	// }, [list]);

	// useEffect(() => {
	// 	setDefaultValues({});
	// }, [selectedTeam]);

	useEffect(() => {
		Object.entries(defaultValues).forEach(([key, value]) => {
			setValue(key, value);
		});
	}, [setValue, defaultValues]);

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
													// rules={{ required: true }}
												/>
												{/* {errors?.[name] ? 'Required' : null} */}
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
					disabled={shiftDataLoading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}
export default ShiftConfiguration;
