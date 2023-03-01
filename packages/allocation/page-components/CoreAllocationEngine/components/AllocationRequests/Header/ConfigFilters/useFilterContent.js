import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import controls from '../../../../configurations/get-requests-filter-controls';

const useFilterContent = ({ params, setParams }) => {
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
			setParams((pv) => ({
				...pv,
				filters: {
					...pv.filters,
					stakeholder_type: undefined,
				},
			}));
		}

		reset();

		setFilters({});

		setShowFilters(false);
	};

	return {
		controls,
		formProps,
		showFilters,
		setShowFilters,
		handleReset,
		applyFilters,
		filtersApplied: !isEmpty(filters),
	};
};

export default useFilterContent;
