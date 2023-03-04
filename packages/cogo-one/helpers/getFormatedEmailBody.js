function getFormatedEmailBody({ emailState }) {
	const checkRegex = /<p>(.+)<\/p>/gm;

	const matchedGroups = (emailState.body).match(checkRegex);

	const isEmpty = (matchedGroups || []).every((item) => item === '<p><br></p>');

	return isEmpty;
}

export default getFormatedEmailBody;
