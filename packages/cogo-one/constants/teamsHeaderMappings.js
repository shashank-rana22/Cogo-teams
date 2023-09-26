import { IcMCall, IcMVideoCall } from '@cogoport/icons-react';

const BUTTON_GROUP_OPTIONS = [{
	children: (<IcMCall
		width={18}
		height={18}
		fill="#777"
	/>
	),
	onClick: () => {
		console.log('Left Button');
	},

}, {
	children: (<IcMVideoCall
		width={18}
		height={18}
		fill="#777"
	/>
	),
	onClick: () => {
		console.log('Right Button');
	},

}];

export { BUTTON_GROUP_OPTIONS };
