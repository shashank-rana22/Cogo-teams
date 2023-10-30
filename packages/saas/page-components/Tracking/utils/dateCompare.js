const { isSameDay } = require('@cogoport/utils');

const isCurrentDate = (inputDate) => isSameDay(new Date(), new Date(inputDate));
const isFutureDate = (inputDate) => new Date() < new Date(inputDate);

export { isCurrentDate, isFutureDate };
