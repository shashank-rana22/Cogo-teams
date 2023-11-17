import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import getAdoptionControls from '../../../../../configurations/adoptionFilterControls';
import { getFieldController } from '../../../../../utils/getFieldController';

import styles from './styles.module.css';

function FilterContent({
	setFilterValues = () => {}, initialViewType = '', pageType = '',
}) {
	const { control, handleSubmit, reset, watch } = useForm();
	const {
		request_type = '', requested_by = '', assigned_to = '', escalation_cycle = '',
		request_status = '', requested_completed_by = '', dateRange = {},
	} = watch();

	const controls = getAdoptionControls({ initialViewType, pageType });

	const handleFilter = (val) => {
		setFilterValues(() => ({
			requestType      : val?.request_type,
			assignTo         : val?.assigned_to,
			escalationCycle  : val?.escalation_cycle,
			requestStatus    : val?.request_status,
			start            : val?.dateRange?.startDate,
			end              : val?.dateRange?.endDate,
			requestCompleted : val?.requested_completed_by,
		}));
	};

	const handleReset = () => {
		reset();
		setFilterValues(() => ({
			requestType      : '',
			assignTo         : '',
			escalationCycle  : '',
			requestStatus    : '',
			start            : null,
			end              : null,
			requestCompleted : '',
			show             : false,
		}));
	};

	const disableButton = !request_type && !assigned_to && !requested_by && !escalation_cycle && !request_status
	&& !requested_completed_by && isEmpty(dateRange);

	return (
		<div className={styles.container}>
			{(controls || []).map((controlItem) => {
				const { name, label, controllerType } = controlItem || {};
				const Element = getFieldController(controllerType);

				if (!Element) {
					return null;
				}

				return (
					<div className={styles.wrap} key={name}>
						<div className={styles.label}>{label}</div>
						<Element
							{...controlItem}
							key={name}
							id={name}
							size="sm"
							control={control}
						/>
					</div>
				);
			})}
			<div className={styles.footer_section}>
				<Button
					themeType="secondary"
					size="sm"
					onClick={handleReset}
					className={styles.reset_button}
				>
					Reset
				</Button>
				<Button
					themeType="accent"
					size="sm"
					onClick={handleSubmit(handleFilter)}
					disabled={disableButton}
					type="submit"
				>
					Apply
				</Button>
			</div>
		</div>
	);
}

export default FilterContent;
