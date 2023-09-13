import { Loader } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import useListMargins from '../../hooks/useListMargins';
import Create from '../Create';

function Edit() {
	const { query } = useSelector(({ general }) => general);
	const { data, loading, setFilterParams } = useListMargins({
		defaultParams: { margin_stats_required: true, page_limit: 5 },
	});
	useEffect(() => {
		setFilterParams({ id: query?.id });
	}, [query?.id, setFilterParams]);

	return (
		<div>
			{loading ? <Loader /> : <Create type="edit" item={data?.list?.shift()} />}
		</div>
	);
}

export default Edit;
