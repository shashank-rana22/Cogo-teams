import { IcMCall, IcMVideoCall } from '@cogoport/icons-react';

const getButtonGroups = ({ onClickFunc = () => {} }) => [{
	children: (<IcMCall
		width={18}
		height={18}
		fill="#777"
	/>
	),
	onClick: onClickFunc,

}, {
	children: (<IcMVideoCall
		width={18}
		height={18}
		fill="#777"
	/>
	),
	onClick: onClickFunc,
}];

export { getButtonGroups };
