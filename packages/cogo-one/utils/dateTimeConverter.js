import { format } from '@cogoport/utils';

const dateTimeConverter = (t, updated_at) => {
	const elasptime = Math.floor(t);
	let renderTime;
	let rendershortform;

	if (elasptime < 20000) {
		renderTime = 'now';
		rendershortform = 'now';
	} else if (elasptime < 60000) {
		renderTime = `${Math.floor(elasptime / 1000)} s ago`;
		rendershortform = 'now';
	} else if (elasptime < 3600000) {
		renderTime = `${Math.floor(elasptime / 60000)} min ago`;
		rendershortform = `${Math.floor(elasptime / 60000)} m`;
	} else if (elasptime < 86400000) {
		renderTime = `${Math.floor(elasptime / 3600000)} hr ago`;
		rendershortform = `${Math.floor(elasptime / 3600000)} h`;
	} else if (elasptime < 172800000) {
		renderTime = `${Math.floor(elasptime / 86400000)} Day ago`;
		rendershortform = 'yesterday';
	} else if (elasptime < 604800000) {
		renderTime = `${Math.floor(elasptime / 86400000)} Day ago`;
		rendershortform = `${Math.floor(elasptime / 86400000)} D`;
	} else if (elasptime < 2629746000) {
		renderTime = `${Math.floor(elasptime / 604800000)} Week ago`;
		rendershortform = `${format(updated_at, 'dd/MM/yyyy')}`;
	} else if (elasptime < 31556952000) {
		renderTime = `${Math.floor(elasptime / 2629746000)} Month ago`;
		rendershortform = `${format(updated_at, 'dd/MM/yyyy')}`;
	} else {
		renderTime = `${Math.floor(elasptime / 31556952000)} Year ago`;
		rendershortform = `${format(updated_at, 'dd/MM/yyyy')}`;
	}

	return { renderTime, rendershortform };
};

export default dateTimeConverter;
