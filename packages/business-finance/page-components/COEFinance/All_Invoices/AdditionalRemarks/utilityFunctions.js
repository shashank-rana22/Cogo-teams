import { isEmpty } from '@cogoport/utils';

export 	const formatReason = (reason) => {
	if (typeof (reason) === 'string' && !isEmpty(reason)) {
		return ` - ${reason}`;
	}
	return '';
};
