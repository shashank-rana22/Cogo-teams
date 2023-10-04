const combineDateAndTime = ({ date, time }) => {
	const year = date?.getFullYear();
	const month = date?.getMonth();
	const day = date?.getDate();

	const hours = time?.getHours();
	const minutes = time?.getMinutes();
	const seconds = time?.getSeconds();

	const combineDateTime = new Date(year, month, day, hours, minutes, seconds);

	return combineDateTime;
};

export default combineDateAndTime;
