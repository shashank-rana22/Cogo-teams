import { useWatch, useDebounceQuery, SelectController, useForm } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetControls from '../../utils/filterControls';
import useListReassignControls from '../../utils/list-reassign-manager-controls';
import { getFieldController } from '../Form/getFieldController';

import styles from './styles.module.css';

function Filters({ params = {}, setParams = () => {}, source = '' }) {
	const { query = '', debounceQuery } = useDebounceQuery();

	const filterProps = params;
	const leftFilters = ['department', 'designation',
		...(source === 'hr_kpi_dashboard' ? ['manager_name', 'year', 'month'] : []),
		...(source === 'hr_feedback' ? ['year', 'month'] : []),
		...(source === 'hr_pip_dashboard' ? ['status', 'date_range'] : []),
		...(source === 'hr_pip_pending' ? ['status'] : []),
	];
	const rightFilters = ['manager_name'];

	const filterControls = useGetControls(
		{
			leftFilters,
			rightFilters,
			filterProps,
			setParams,
		},
	);

	const { watch, control } = useForm();
	const values = useWatch({
		control,
		fields: [
			...leftFilters,
			...rightFilters,
			...(source === 'hr_feedback' ? 'manager_id' : []),
		],
	});

	const managerName = watch('manager_name');

	const cogoUsersControl = useListReassignControls();

	useEffect(() => {
		const { department, designation, status: Status, manager_id, year, month, date_range } = values;

		setParams((previousParams) => ({
			...previousParams,
			Q           : query || undefined,
			Department  : department || undefined,
			Designation : designation || undefined,
			LogType     : Status || undefined,
			Page        : 1,
			Year        : year || undefined,
			Month       : month || undefined,
			ManagerID   : manager_id || undefined,
			StartDate   : date_range?.startDate || undefined,
			EndDate     : date_range?.endDate || undefined,
		}));
	}, [query, setParams, values]);

	useEffect(() => {
		debounceQuery(managerName);
	}, [debounceQuery, managerName]);

	return (
		<div className={styles.filters_container}>
			<div className={styles.left_container}>
				{filterControls.left.map((cntrl) => {
					if (isEmpty(cntrl)) { return null; }
					const Element = getFieldController(cntrl.type);
					const value = startCase(cntrl.name);
					return (
						<Element
							{...cntrl}
							control={control}
							key={cntrl.name}
							id={`${cntrl}_id`}
							value={params[value]}
							style={{ marginRight: '8px' }}
						/>
					);
				})}
				{ source.includes('feedback') && (
					<SelectController
						{...cogoUsersControl}
						style={{ marginRight: '8px' }}
						control={control}
						placeholder="Manager..."
						isClearable
					/>
				)}
			</div>
			<div className={styles.right_container}>
				{source !== 'hr_kpi_dashboard' && filterControls.right.map((cntrl) => {
					if (isEmpty(cntrl)) { return null; }
					const Element = getFieldController(cntrl?.type);
					const value = startCase(cntrl?.name);
					return (
						<Element
							{...cntrl}
							control={control}
							key={cntrl.name}
							id={`${cntrl}_id`}
							value={params[value]}
							style={{ marginRight: '8px' }}
							placeholder="Search User.."
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Filters;
