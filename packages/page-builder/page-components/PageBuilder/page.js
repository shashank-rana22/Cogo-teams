import { PageBuilder } from '@cogoport/components';

import useGetDynamicPage from '../../hooks/useGetDynamicPage';
import useUpdateDynamicPage from '../../hooks/useUpdateDynamicPage';

function DynamicPage() {
	const { handleSave } = useUpdateDynamicPage();
	const { initialPageData, metaData } = useGetDynamicPage();

	return (
		<PageBuilder
			handleSave={handleSave}
			handleSaveAndClose={handleSave}
			builderMode="edit"
			initialPageData={initialPageData}
			metaData={metaData}
		/>
	);
}

export default DynamicPage;
