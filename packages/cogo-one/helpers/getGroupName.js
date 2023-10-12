function formatNames({ userIdsData = [] }) {
	const userNamesArray = userIdsData?.map((eachUserData) => eachUserData?.name) || [];

	const [firstName = '', secondName = ''] = userNamesArray || [];

	return `${firstName},${secondName} +${userNamesArray.length - 2} more`;
}

export default formatNames;
