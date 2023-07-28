import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getAgentsFilterControls from '../../../../configurations/get-agents-filters-controls';

const MIN_LENGTH = 0;

const controls = getAgentsFilterControls();

const useFilterContent = (props) => {
	const { setParams } = props;

	const [showFilters, setShowFilters] = useState(false);

	const [filters, setFilters] = useState({});

	const formProps = useForm();

	const { reset, getValues } = formProps;

	const resetParams = () => {
		const FILTER_VALUES = {};
		controls.forEach((control) => {
			FILTER_VALUES[control.name] = undefined;
		});
		return FILTER_VALUES;
	};

	useEffect(() => {
		if (!isEmpty(filters)) {
			setParams((previousParams) => ({
				...previousParams,
				page    : 1,
				filters : {
					...(previousParams.filters || {}),
					...filters,
				},
			}));
		}
	}, [filters, setParams]);

	const applyFilters = () => {
		const data = getValues();

		const FILTER_VALUES = {};
		controls.forEach((control) => {
			if (!isEmpty(data[control.name] || {})) {
				FILTER_VALUES[control.name] = data?.[control.name];
			}
		});
		setFilters(FILTER_VALUES);
	};

	const handleReset = () => {
		setParams((previousParams) => ({
			...previousParams,
			page    : 1,
			filters : {
				...(previousParams.filters || {}),
				...(resetParams()),
			},
		}));

		reset();

		setFilters({});

		setShowFilters(false);
	};

	const filtersApplied = Object.keys(filters).length !== MIN_LENGTH;

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
