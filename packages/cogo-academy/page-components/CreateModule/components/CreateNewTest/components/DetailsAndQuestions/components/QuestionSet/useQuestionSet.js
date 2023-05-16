import { useState, useEffect, useCallback } from 'react';

import useGetTestQuestionSets from '../../../../../../hooks/useGetTestQuestionSets';

import getQuestionSetColumns from './getQuestionSetColumns';

function useQuestionSet({ idArray, watch, setIdArray, sortFilter, setSortFilter }) {
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState(false);

	const {
		data,
		loading,
		setParams,
		debounceQuery,
		input,
		setInput,
	} = useGetTestQuestionSets({ filters });

	const cogo_entity_id = watch('cogo_entity_id');

	const { sort_type = '' } = sortFilter || {};

	useEffect(() => {
		setFilters((prev) => ({ ...prev, cogo_entity_id }));
	}, [cogo_entity_id]);

	const handleSort = useCallback(() => {
		setSort((prev) => !prev);
		setParams((prev) => ({
			...prev,
			sort_type : sort ? 'asc' : 'desc',
			filters   : {
				...prev.filters,
			},
		}));
	}, [setParams, sort]);

	const columns = getQuestionSetColumns({ idArray, setIdArray, sortFilter, setSortFilter, handleSort });

	useEffect(() => {
		handleSort();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sort_type]);

	return {
		debounceQuery,
		input,
		setInput,
		loading,
		data,
		handleSort,
		columns,
		sort,
		setParams,
	};
}

export default useQuestionSet;
