import { Tooltip, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCopy } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';

function CopyUrl({ details = {} }) {
	const { spot_search_id } = useSelector(({ general }) => ({
		spot_search_id: general?.query?.spot_search_id,
	}));

	const { importer_exporter_id, importer_exporter_branch_id, importer_exporter = {} } = details;

	const handleCopy = async () => {
		const url = importer_exporter.tags?.
			[GLOBAL_CONSTANTS.zeroth_index] === 'partner' ? `https://partners.cogoport.com/${
				importer_exporter.partner_id
			}/book/${spot_search_id}` : `https://app.cogoport.com/${importer_exporter_id}/${
				importer_exporter_branch_id
			}/book/${spot_search_id}`;

		await navigator.clipboard.writeText(url);

		Toast.success('Copied to clipboard');
	};

	return (
		<Tooltip placement="top" content="Copy results link">
			<IcMCopy
				style={{ margin: '4px 12px 0 16px' }}
				cursor="pointer"
				width={18}
				height={18}
				onClick={handleCopy}
			/>
		</Tooltip>
	);
}

export default CopyUrl;
