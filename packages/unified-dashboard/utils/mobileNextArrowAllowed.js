const mobileNextArrowAllowed = (selectedFilterTab = 'month', data, maxEtd) => {
	switch (selectedFilterTab) {
		case 'month': {
			const etdMonth = new Date(
				`${data[data?.length - 1]?.year}/${data[data?.length - 1]?.month}/${
					data[data?.length - 1]?.day
				}`,
			);

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
