import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import controls from '../../../../configurations/get-details-filter-controls';

const useDetailsFilterContent = ({ params, setParams }) => {
	const [showFilters, setShowFilters] = useState(false);

	const [filters, setFilters] = useState({});

	const formProps = useForm();

	const { reset, getValues } = formProps;

	useEffect(() => {
		if (!isEmpty(filters)) {
			setParams({
				...params,
				page    : 1,
				filters : {
					...params.filters,
					...filters,
				},
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

	const applyFilters = () => {
		const data = getValues();

		const values = {};
		controls.forEach((control) => {
			if (!isEmpty(data[control.name] || {})) {
				values[control.name] = data?.[control.name];
			}
		});
		setFilters(values);
	};

	const handleReset = () => {
		if (!isEmpty(filters)) {
			setParams({
				...params,
				filters: {
					...(params.filters || {}),
					stakeholder_id     : undefined,
					old_stakeholder_id : undefined,
				},
			});
		}

		reset();

		setFilters({});

		setShowFilters(false);
	};

	const filtersApplied = Object.keys(filters).length !== 0;

	return {
		controls,
		formProps,
		showFilters,
		setShowFilters,
		handleReset,
		applyFilters,
		filtersApplied,
	};
};

export default useDetailsFilterContent;
