const mobileNextArrowAllowed = (data, maxEtd, selectedFilterTab = 'month') => {
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
		default:
			break;
	}

	return false;
};

export default mobileNextArrowAllowed;
