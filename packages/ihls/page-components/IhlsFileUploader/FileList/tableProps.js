import { useRouter } from '@cogoport/next';
import { useState, useEffect, useCallback } from 'react';
import { useRequest, useAthenaRequest } from '@cogoport/request';

const tableProps = () => {
    const router = useRouter();
    const [sortType, setSortType] = useState(true);
    const [filters, setFilters] = useState({});
	const [page, setPage] = useState(1);

    const SORT_TYPE = (sortType) ? 'desc' : 'asc';
	const SORT_MODE = 'created_at';

    const [{ data: questionList, loading }, trigger] = useAthenaRequest({
		method : 'get',
		url    : '/list_faq_questions',
        params: {
            filters: {
                ...filters,
            },
            page                   : page,
            per_page               : 10,
            sort_by                : SORT_MODE,
            sort_type              : SORT_TYPE,
            user_id                : "",
        },
	}, { manual: true });

    const onClickViewButton = (id) => {};



    return{};
}

export default tableProps;