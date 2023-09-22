import { Loader } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

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
			{loading ? <Loader /> : null}
			{ !loading && !isEmpty(data?.list) ? <Create type="edit" item={data?.list?.[ZERO]} /> : null}
		</div>
	);
}

export default Edit;
