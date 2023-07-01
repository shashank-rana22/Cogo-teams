import getNextWeekDate from './getNextWeek';

const mobileNextArrowAllowed = (selectedFilterTab, data, maxEtd = '') => {
	switch (selectedFilterTab) {
		case 'month': {
			const lastData = data && data.length > 0 ? data[data.length - 1] : null;
			const etdMonth = lastData ? new Date(`${lastData.year}/${lastData.month}/${lastData.day}`) : null;

			const getMonth = etdMonth.getMonth();
			const getYear = etdMonth.getFullYear();

			const maxEtdMonth = new Date(maxEtd);

			const getEtdMonth = maxEtdMonth.getMonth();
			const getEtdYear = maxEtdMonth.getFullYear();

			if (
				new Date(getYear, getMonth).toString()
				=== new Date(getEtdYear, getEtdMonth).toString()
			) {
				return true;
			}
			return false;
		}

		case 'week': {
			const lastDataIndex = data && data.length > 0 ? data.length - 1 : null;
			const etdWeek = lastDataIndex !== null ? data[lastDataIndex] : null;
			const nextWeekDate = getNextWeekDate(etdWeek, true);
			if (nextWeekDate > new Date(maxEtd)) {
				return true;
			}
			return false;
		}
		case 'quarter': {
			const lastData = data && data.length > 0 ? data[data.length - 1] : null;
			const year = lastData?.year;
			const month = lastData?.month;
			const day = lastData?.day;
			const date = year && month && day ? new Date(`${year}/${month}/${day}`) : null;

			const nextQuarterMonth = new Date(date.setMonth(date.getMonth() + 5));
			const getEndDate = new Date(
				nextQuarterMonth.getFullYear(),
				nextQuarterMonth.getMonth() + 1,
				0,
			);

			if (maxEtd === null) {
				return false;
			}

			if (new Date(getEndDate) > new Date(maxEtd)) {
				return true;
			}
			return false;
		}
		default:
			break;
	}

	return true;
};

export default mobileNextArrowAllowed;
