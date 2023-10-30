import { Button } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';

import useRefetchPdfs from './useRefetchPdfs';

export default function RefetchPdfs({ itemData = {} }) {
	const { entityCode, id } = itemData || {};
	const refetchPdf = ENTITY_FEATURE_MAPPING[entityCode].feature_supported.includes('refetch-pdfs');
	const { onRefetch, loading } = useRefetchPdfs({ id });

	if (!refetchPdf) { return null; }

	const handleClick = () => {
		onRefetch();
	};

	return (
		<Button onClick={handleClick} type="button" disabled={loading}>
			{loading ? 'Refetching' : 'Refetch'}
		</Button>
	);
}
