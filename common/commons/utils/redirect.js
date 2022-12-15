import { Router } from 'next/router';

const redirect = ({
	isServer, res, path, hardRedirect,
}) => {
	if (isServer) {
		res.writeHead(302, {
			Location: path,
		});
		res.end();
	} else if (hardRedirect) {
		window.location.href = path;
	} else {
		Router.push(path);
	}
};

export default redirect;
