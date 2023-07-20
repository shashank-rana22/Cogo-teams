import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getObjectiveFilterControls from '../../../../../configurations/get-objective-filter-controls';

const MIN_LENGTH = 0;

const controls = getObjectiveFilterControls();

const useFilterContent = (props) => {
	const { setParams } = props;

	const [showFilters, setShowFilters] = useState(false);

	const [filters, setFilters] = useState({});

	const formProps = useForm();

	const { reset, getValues } = formProps;

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
		if (!isEmpty(filters)) {
			setParams((previousParams) => ({
				...previousParams,
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
			}));
		}

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
