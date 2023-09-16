import { Loader } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import useListMargins from '../../hooks/useListMargins';
import Create from '../Create';

const ZERO = 0;
function Edit() {
	const { query } = useSelector(({ general }) => general);
	const { data, loading } = useListMargins({
		defaultFilters: { id: query?.id },
	});
	return (
		<div>
			{loading ? <Loader /> : <Create type="edit" item={data?.list?.[ZERO]} />}
		</div>
	);
}

export default Edit;
