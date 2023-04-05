import { useDebounceQuery, useForm } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import filtersSourceMapping from '../../constants/filters-source-mapping';
import useGetControls from '../../utils/filterControls';
import { getElementController } from '../../utils/getElementController';

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

	const {
		Department = '', Designation = '',
		ManagerID = '', Year = '', Month = '', date_range = {},
		Q = '', CsvType = '',
	} = watch();

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			Q           : query || undefined,
			Department  : Department || undefined,
			Designation : Designation || undefined,
			Year        : Year || undefined,
			Month       : Month || undefined,
			ManagerID   : ManagerID || undefined,
			StartDate   : date_range?.startDate || undefined,
			EndDate     : date_range?.endDate || undefined,
			CsvType     : CsvType || undefined,
		}));
	}, [query, setParams, Month, Department, Designation, Year, ManagerID, CsvType,
		date_range?.startDate, date_range?.endDate]);

	useEffect(() => {
		debounceQuery(Q);
	}, [debounceQuery, Q]);

	return (
		<div className={styles.filters_container}>
			<div className={styles.left_container}>
				{filterControls.left.map((cntrl) => {
					if (isEmpty(cntrl)) { return null; }
					const Element = getElementController(cntrl.type);

					const value = startCase(cntrl.name);

					return (
						<Element
							{...cntrl}
							control={control}
							key={cntrl.name}
							id={`${cntrl}_id`}
							value={params[value]}
							style={{ margin: '8px 8px 0 0' }}
						/>
					);
				})}
			</div>

			<div className={styles.right_container}>
				{filterControls.right.map((cntrl) => {
					if (isEmpty(cntrl)) { return null; }
					const Element = getElementController(cntrl?.type);

					const value = startCase(cntrl?.name);

					return (
						<Element
							{...cntrl}
							control={control}
							key={cntrl.name}
							id={`${cntrl}_id`}
							value={params[value]}
							style={{ marginRight: '8px 8px 0 0' }}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Filters;
