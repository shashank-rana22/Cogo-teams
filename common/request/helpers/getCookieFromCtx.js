export const getCookieFromCtx = (name, ctx) => {
	try {
		const cookieString = ctx?.req?.headers?.cookie || '';
		const arr = cookieString.match(new RegExp(`${name}=([^;]+)`)) || [];
		return arr[1];
	} catch (err) {
		return null;
	}
};
