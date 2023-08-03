import { Tooltip } from '@cogoport/components';
import React from 'react';

interface Props {
	advanceDocumentNo:string;
}
interface ItemProps {
	itemData:Props,
}
const DOCUMENT_NUMBER_LENGTH = 10;
const SUBSTRING_MAX_LENGTH = 10;
function AdvanceDocNumber({ itemData }:ItemProps) {
	const { advanceDocumentNo = '' } = itemData || {};
	return (
		<div>
			{advanceDocumentNo.length > DOCUMENT_NUMBER_LENGTH
				? (
					<Tooltip interactive placement="top" content={advanceDocumentNo || '-'}>
						<text>
							{`${(advanceDocumentNo).substring(0, SUBSTRING_MAX_LENGTH)}...` }
						</text>
					</Tooltip>
				) : advanceDocumentNo}
		</div>
	);
}

export default AdvanceDocNumber;
