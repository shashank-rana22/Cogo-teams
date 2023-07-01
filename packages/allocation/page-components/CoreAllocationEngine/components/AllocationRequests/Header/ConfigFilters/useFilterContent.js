import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import controls from '../../../../configurations/get-requests-filter-controls';

const useFilterContent = ({ params, setParams }) => {
	const [showFilters, setShowFilters] = useState(false);

	const formProps = useForm({ defaultValues: { status: 'pending' } });

	const { reset, getValues } = formProps;

	const [filters, setFilters] = useState(getValues());

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
			const { name } = control;

			if (!isEmpty(data[name] || {})) {
				if (name === 'created_at') {
					values.created_at_greater_than = data[name]?.startDate || undefined;
					values.created_at_less_than = data[name]?.endDate || undefined;
				} else {
					values[name] = data[name];
				}
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
