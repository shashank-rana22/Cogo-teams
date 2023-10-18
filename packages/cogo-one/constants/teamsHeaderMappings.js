import { IcMCall, IcMVideoCall } from '@cogoport/icons-react';

const getButtonGroups = ({ onClickFun = () => {} }) => [{
	children: (<IcMCall
		width={18}
		height={18}
		fill="#777"
	/>
	),
	onClick: onClickFun,

}, {
	children: (<IcMVideoCall
		width={18}
		height={18}
		fill="#777"
	/>
	),
	onClick: onClickFun,
}];

export { getButtonGroups };
