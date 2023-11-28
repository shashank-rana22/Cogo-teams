import { Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import useListMargins from '../../hooks/useListMargins';
import Create from '../Create';

function Edit() {
	const { query } = useSelector(({ general }) => general);

	const { data = {}, loading = false } = useListMargins({
		defaultFilters : { id: query?.id },
		type           : 'edit',
	});

	return (
		<div>
			{loading ? <Loader /> : null}
			{!loading && !isEmpty(data?.list)
				? <Create type="edit" item={data?.list?.[GLOBAL_CONSTANTS.zeroth_index]} />
				: null}
		</div>
	);
}

export default Edit;
