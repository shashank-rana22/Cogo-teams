import { Tooltip, Toast } from '@cogoport/components';
import { IcMCopy } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React from 'react';

function CopyUrl({ details }) {
	const { spot_search_id } = useSelector(({ general }) => ({
		spot_search_id: general?.query?.spot_search_id,
	}));

	const handleCopy = async () => {
		await navigator.clipboard.writeText(`https://app.cogoport.com/app/${details?.importer_exporter_id}/${
			details?.importer_exporter_branch_id
		}/importer-exporter/book/${spot_search_id}`);

		Toast.success('Copied to clipboard');
	};

	return (
		<Tooltip placement="top" content="Copy results link">
			<IcMCopy
				style={{
					margin : '4px 12px 0 16px',
					cursor : 'pointer',
				}}
				width={18}
				height={18}
				onClick={handleCopy}
			/>
		</Tooltip>
	);
}

export default CopyUrl;
