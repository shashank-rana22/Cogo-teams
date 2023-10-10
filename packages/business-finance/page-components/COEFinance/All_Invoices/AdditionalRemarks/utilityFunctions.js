import { isEmpty } from '@cogoport/utils';

const formatReason = ({ reason = '', isMainCategory = false }) => {
	if (typeof (reason) === 'string' && !isEmpty(reason)) {
		if (isMainCategory) {
			return reason;
		}
		return ` - ${reason}`;
	}
	return '';
};

export default formatReason;
