import React from 'react';

import IRNCancel from '../IRNCancel';
import IRNGenerate from '../IRNGenerate';
import RefetchPdfs from '../RefetchPdf';

const IS_ELIGIBLE_CHECK = ['FINANCE_ACCEPTED', 'POSTED', 'IRN_FAILED'];
const IS_CANCELLABLE_CHECK = ['IRN_GENERATED', 'POSTED', 'FAILED', 'IRN_CANCELLED'];
const REFETCH_STATUS = ['IRN_GENERATED', 'IRN_CANCELLED'];

function RenderIRNGenerated({ itemData = { invoiceStatus: '' }, refetch = () => {} }: any) {
	const statusComponentMap: any = [
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
	return (
		<>
			{statusComponentMap.map((item) => {
				const Element = item.component;
				return (item.status.includes(itemData?.invoiceStatus)
					? (
						<React.Fragment key={itemData}>
							<Element itemData={itemData} refetch={refetch} />
						</React.Fragment>
					) : null);
			})}
		</>
	);
}

export default RenderIRNGenerated;
