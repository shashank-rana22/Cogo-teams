import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getControls from '../../../../configurations/get-configurations-filter-controls';

const useFilterContent = ({ params, setParams, t = () => {} }) => {
	const [showFilters, setShowFilters] = useState(false);

	const [filters, setFilters] = useState({});

	const controls = getControls({ t });

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

		const VALUES = {};
		controls.forEach((control) => {
			if (!isEmpty(data[control.name] || {})) {
				VALUES[control.name] = data?.[control.name];
			}
		});
		setFilters(VALUES);
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

	const filtersApplied = Object.keys(filters).length !== GLOBAL_CONSTANTS.zeroth_index;

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
