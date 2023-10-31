import { Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
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
	entityCode = '',
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

	const { user_id } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const showPopover = ['101', '301', '501']?.includes(entityCode)
	|| (!['101', '301', '501']?.includes(entityCode)
	&& [GLOBAL_CONSTANTS.uuid.vinod_talapa_user_id, GLOBAL_CONSTANTS.uuid.hk_user_id].includes(user_id));

	return (
		<div>
			{showPopover ? (
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
			) : null}
		</div>
	);
}

export default RenderIRNGenerated;
