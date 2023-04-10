import { useState, useEffect } from 'react';

import useGetTestQuestionSets from '../../../../../../hooks/useGetTestQuestionSets';

import getQuestionSetColumns from './getQuestionSetColumns';

function useQuestionSet({ idArray, watch, setIdArray }) {
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

	useEffect(() => {
		setFilters((prev) => ({ ...prev, cogo_entity_id }));
	}, [cogo_entity_id]);

	const columns = getQuestionSetColumns({ idArray, setIdArray });

	const handleSort = () => {
		setSort((prev) => !prev);
		setParams((prev) => ({
			...prev,
			sort_type : sort ? 'asc' : 'desc',
			filters   : {
				...prev.filters,
			},
		}));
	};

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
