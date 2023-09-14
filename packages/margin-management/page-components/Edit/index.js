import { Loader } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import useListMargins from '../../hooks/useListMargins';
import Create from '../Create';

function Edit() {
	const { query } = useSelector(({ general }) => general);
	const { data, loading, setFilterParams } = useListMargins({
		defaultParams: { margin_stats_required: true, page_limit: 5 },
	});
	const [item, setItem] = useState({});
	useEffect(() => {
		setFilterParams({ id: query?.id });
		setItem(data?.list?.shift());
	}, [query?.id, setFilterParams, data?.list]);

	return (
		<div>
			{loading ? <Loader /> : <Create type="edit" item={item} />}
		</div>
	);
}

export default Edit;
