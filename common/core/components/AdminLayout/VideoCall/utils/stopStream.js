import { isEmpty } from '@cogoport/utils';

export const stopStream = ({ streamType = '', currentStream = {} }) => {
	if (isEmpty(currentStream) || !currentStream[streamType]) {
		return;
	}

	const tracks = currentStream[streamType]?.getTracks();

	tracks?.forEach((track) => {
		track?.stop();
	});
};
