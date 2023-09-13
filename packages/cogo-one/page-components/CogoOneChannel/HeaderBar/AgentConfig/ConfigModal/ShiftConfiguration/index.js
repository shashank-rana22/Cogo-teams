import { Select, Button } from '@cogoport/components';
import { useForm, TimepickerController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useState, useEffect, useMemo } from 'react';

import { CONTROLS, SHIFT_CONFIGURATION_HEADING, teamsOption } from '../../../../../../constants/shiftsMapping';
import useListCogooneShift from '../../../../../../hooks/useListCogooneShift';
import useUpdateCogooneShift from '../../../../../../hooks/useUpdateCogooneShift';
import getDefaultValues from '../../../../../../utils/getDefaultValues';

import styles from './styles.module.css';

function ShiftConfiguration({ handleClose = () => {}, viewType = '' }) {
	const [selectedTeam, setSelectedTeam] = useState('shipment_specialist');

	const {
		getListShift = () => {},
		shiftsData = {},
	} = useListCogooneShift({ selectedTeam });

	const { updateTeamsShift = () => {} } = useUpdateCogooneShift({ getListShift });

	const { list = [], shiftDataLoading = false } = shiftsData || {};

	const defaultValues = useMemo(() => getDefaultValues({ list }), [list]);

	const toShowSelect = viewType === 'cogoone_admin';

	const { control, setValue, handleSubmit, formState:{ errors = {} } } = useForm({});

	const onSubmit = (val) => {
		const formattedValues = (list || []).map((itm) => {
			const { id: shiftId, local_time_zone = '', shift_name = '' } = itm || {};
			return {
				shift_id         : shiftId,
				start_time_local : formatDate({
					date       : val[`${shift_name}_shift_start_time`] || new Date(),
					timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
					formatType : 'time',
				}),
				end_time_local: formatDate({
					date       : val[`${shift_name}_shift_end_time`] || new Date(),
					timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
					formatType : 'time',
				}),
				local_time_zone,
			};
		});
		updateTeamsShift(formattedValues);
	};

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
										rules={{ required: true }}
									/>
									{errors?.[name] ? 'Required' : null}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
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
