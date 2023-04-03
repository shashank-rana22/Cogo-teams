import { useWatch, useDebounceQuery, useForm } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import filtersSourceMapping from '../../constants/filters-source-mapping';
import useGetControls from '../../utils/filterControls';
import { getFieldController } from '../Form/getFieldController';

import styles from './styles.module.css';

function Filters({ params = {}, setParams = () => {}, source = '' }) {
	const { query = '', debounceQuery } = useDebounceQuery();

	const filterProps = params;

	const { left:leftFilters = [], right:rightFilters = [] } = filtersSourceMapping[source];

	const filterControls = useGetControls(
		{
			leftFilters,
			rightFilters,
			filterProps,
		},
	);

	const { watch, control } = useForm();
	const values = useWatch({
		control,
		fields: [
			...leftFilters,
			...rightFilters,
		],
		defaultValues: params,
	});

	const managerName = watch('manager_name');

	useEffect(() => {
		const { Department, Designation, ManagerID, Year, Month, date_range } = values;

		setParams((previousParams) => ({
			...previousParams,
			Q         : query || undefined,
			Department,
			Designation,
			Page      : 1,
			Year,
			Month,
			ManagerID,
			StartDate : date_range?.startDate || undefined,
			EndDate   : date_range?.endDate || undefined,
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
			</div>
			<div className={styles.right_container}>
				{filterControls.right.map((cntrl) => {
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
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Filters;
