export const getformattedDuration = (date) => {
	if (!date) return null;

	const date1 = new Date(date);
	const date2 = new Date();

	const diffInDays = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
	const month = `${Math.floor(diffInDays / 30)} Month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} `;
	const day = `${diffInDays % 30} Day${diffInDays % 30 > 1 ? 's' : ''}`;

	const duration = `${diffInDays >= 30 ? `${month}` : ''}${day}`;

	return duration;
};
