import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import controls from '../../../../configurations/get-configurations-filter-controls';

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
			setParams({
				...params,
				sort_type : 'desc',
				sort_by   : 'created_at',
				page      : 1,
				filters   : {
					status: [
						'active',
						'draft',
						'publishable',
						'checking',
						'not_publishable',
					],
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

export default useFilterContent;
