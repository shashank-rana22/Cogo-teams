import { Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useState } from 'react';

import FinanceRejectContent from './FinanceRejectContent';

type Itemdata = {
	id?: string;
	invoiceStatus?: string;
	entityCode?: string;
	daysLeftForAutoIrnGeneration?: string;
	isFinalPosted?:boolean;
	invoiceType?:string;
};
interface IRNGeneration {
	itemData?: Itemdata;
	refetch?: Function;
}

function IRNGenerate({ itemData = {}, refetch = () => {} }: IRNGeneration) {
	const [visible, setVisible] = useState(false);

	const rest = {
		onClickOutside: () => setVisible(false),
	};

	return (
		<Popover
			placement="left"
			render={<FinanceRejectContent itemData={itemData} refetch={refetch} />}
			visible={visible}
			{...rest}
		>
			<IcMOverflowDot
				style={{ cursor: 'pointer' }}
				width="16px"
				height="16px"
				onClick={() => setVisible(!visible)}
			/>
		</Popover>
	);
}
export default IRNGenerate;
