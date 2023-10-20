import { Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import React from 'react';

import IRNCancel from '../IRNCancel';
import IRNGenerate from '../IRNGenerate';
import RefetchPdfs from '../RefetchPdf';

import Content from './Content';

const IS_ELIGIBLE_CHECK = ['FINANCE_ACCEPTED', 'POSTED', 'IRN_FAILED'];
const IS_CANCELLABLE_CHECK = [
	'IRN_GENERATED',
	'POSTED',
	'FAILED',
	'IRN_CANCELLED',
];
const REFETCH_STATUS = ['IRN_GENERATED', 'IRN_CANCELLED'];

function RenderIRNGenerated({
	itemData = { invoiceStatus: '' },
	refetch = () => {},
}) {
	const statusComponentMap = [
		{
			status    : IS_ELIGIBLE_CHECK,
			component : IRNGenerate,
		},
		{
			status    : IS_CANCELLABLE_CHECK,
			component : IRNCancel,
		},
		{
			status    : REFETCH_STATUS,
			component : RefetchPdfs,
		},
	];

	const showoverflow = statusComponentMap.some((item) => item.status.includes(itemData?.invoiceStatus));

	return (
		<Popover
			placement="left"
			render={(
				<Content
					statusComponentMap={statusComponentMap}
					itemData={itemData}
					refetch={refetch}
				/>
			)}
		>
			{showoverflow
				? (
					<IcMOverflowDot
						cursor="pointer"
						width="16px"
						height="16px"
					/>
				)
				: null}
		</Popover>
	);
}

export default RenderIRNGenerated;
