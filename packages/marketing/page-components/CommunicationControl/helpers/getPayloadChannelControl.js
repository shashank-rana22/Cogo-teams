import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

const INDEX_CHANNEL_TYPE = 1;
const INDEX_MESSAGE = 2;
const ONE_STEP = 1;

const getPAYLOADChannelControl = (formValues) => {
	const GROUPED = {};
	const PAYLOAD = [];

	Object.entries(formValues).forEach(([key, value]) => {
		const temp = key.split(':');
		const id = temp[GLOBAL_CONSTANTS.zeroth_index];
		const channel_type = temp[INDEX_CHANNEL_TYPE];

		if (!GROUPED[id]) {
			GROUPED[id] = { id, channel_type };
		}

		if (temp[INDEX_MESSAGE] === 'msg_per_day' && !isEmpty(value)) {
			GROUPED[id].msg_per_day = value.toString();
		}
		if (temp[INDEX_MESSAGE] === 'msg_per_week' && !isEmpty(value)) {
			GROUPED[id].msg_per_week = value.toString();
		}
		if (temp[INDEX_MESSAGE] === 'msg_per_month' && !isEmpty(value)) {
			GROUPED[id].msg_per_month = value.toString();
		}
	});
	Object.entries(GROUPED).forEach(([, value]) => {
		PAYLOAD.push(value);
	});
	for (let i = 0; i < PAYLOAD.length; i += ONE_STEP) {
		const item = PAYLOAD[i];
		const { channel_type, msg_per_day, msg_per_week, msg_per_month } = item || {};
		if (!isEmpty(msg_per_day) && !isEmpty(msg_per_month) && +msg_per_month < +msg_per_day) {
			return Toast.error(
				`Per day messages limit cannot be greater than Per month messages limit for ${startCase(
					channel_type,
				)} channel type`,
			);
		}
		if (!isEmpty(msg_per_day) && !isEmpty(msg_per_week) && +msg_per_week < +msg_per_day) {
			return Toast.error(
				`Per day messages limit cannot be greater than Per week messages limit for ${startCase(
					channel_type,
				)} channel type`,
			);
		}
		if (!isEmpty(msg_per_month) && !isEmpty(msg_per_week) && +msg_per_month < +msg_per_week) {
			return Toast.error(
				`Per week messages limit cannot be greater than Per month messages limit for ${startCase(
					channel_type,
				)} channel type`,
			);
		}
	}
	return PAYLOAD;
};
export default getPAYLOADChannelControl;
