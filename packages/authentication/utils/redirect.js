import { Router } from '@cogoport/next';

const redirect = ({
	isServer, res, path, hardRedirect,
}) => {
	if (isServer) {
		res.writeHead(302, { Location: path });
		res.end();
	} else if (hardRedirect) {
		// eslint-disable-next-line no-undef
		window.location.href = path;
	} else {
		Router.push(path);
	}
};

export default redirect;
