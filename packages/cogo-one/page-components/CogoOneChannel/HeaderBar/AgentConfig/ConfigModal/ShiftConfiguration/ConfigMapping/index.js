import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useMemo } from 'react';

import { CONTROLS, SHIFT_CONFIGURATION_HEADING } from '../../../../../../../constants/shiftsMapping';
import { transformShiftData } from '../../../../../../../helpers/shiftConfigurationHelpers';
import useCreateBulkCogooneShift from '../../../../../../../hooks/useCreateBulkCogooneShift';
import useUpdateCogooneShift from '../../../../../../../hooks/useUpdateCogooneShift';
import getFormattedShiftData from '../../../../../../../utils/getFormattedShiftData';

import ElementFields from './elementFields';
import styles from './styles.module.css';

function ConfigMapping({
	shiftsData = {},
	selectedTeam = '',
	shiftDataLoading = false,
	handleClose = () => {},
}) {
	const { list = [] } = shiftsData || {};

	const defaultValues = useMemo(
		() => getFormattedShiftData({
			list,
			selectedTeam,
		}),
		[selectedTeam, list],
	);

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors = {}, isDirty },
	} = useForm({ defaultValues });

	const { createUpdateRequest = () => {} } = useUpdateCogooneShift();

	const { createCogooneShiftRequest = () => {} } = useCreateBulkCogooneShift({ handleClose });

	const formValues = watch();

	const onSubmit = async (val) => {
		const formattedValues = transformShiftData({
			newData   : val,
			savedData : list,
		});

		await createUpdateRequest({
			formattedValues,
			prevList: list,
		});

		createCogooneShiftRequest({
			team_name: selectedTeam,
			formattedValues,
		});
	};

	return (
		<>
			<div className={styles.heading}>
				{SHIFT_CONFIGURATION_HEADING.map((item) => (
					<div className={styles.header_label} key={item.key}>
						{item.label}
					</div>
				))}
			</div>

			<div className={styles.mid_section}>
				{CONTROLS.map((controlItm) => {
					const {
						label = '',
						key = '',
						fields = [],
					} = controlItm;

					return (
						<div
							key={key}
							className={styles.shift_details}
						>
							<div className={styles.control_title}>
								{label}
							</div>

							<div className={styles.control_fields}>
								<ElementFields
									control={control}
									fields={fields}
									formValues={formValues}
									errors={errors}
								/>
							</div>
						</div>
					);
				})}
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
					disabled={shiftDataLoading || !isDirty}
				>
					Submit
				</Button>
			</div>
		</>
	);
}

export default ConfigMapping;
