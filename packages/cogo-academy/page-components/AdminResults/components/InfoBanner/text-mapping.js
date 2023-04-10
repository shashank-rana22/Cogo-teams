import { IcMCrossInCircle, IcMFtick, IcMInfo } from '@cogoport/icons-react';

const TEXT_MAPPING = {
	active: {
		key             : 'active',
		text            : 'Test Results have not been published yet.',
		subText         : 'Please click on publish results button when the test is completed',
		Icon            : IcMCrossInCircle,
		iconColor       : '#D6B300',
		backgroundColor : '#FDFBF6',
		borderColor     : '#D6B300',
	},
	published: {
		key             : 'published',
		text            : 'Test Results have been Published.',
		Icon            : IcMFtick,
		subText         : 'Your students can now see their scores.',
		iconColor       : '#849E4C',
		backgroundColor : '#F7FAEF',
		borderColor     : '#849E4C',
	},
	publishing: {
		key             : 'publishing',
		text            : 'Test Results are being Published.',
		Icon            : IcMInfo,
		subText         : 'Your students can now see their scores in a while.',
		iconColor       : '#D6B300',
		backgroundColor : '#FDFBF6',
		borderColor     : '#D6B300',
	},
};

export default TEXT_MAPPING;
