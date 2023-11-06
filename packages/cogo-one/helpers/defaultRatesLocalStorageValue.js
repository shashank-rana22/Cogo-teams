const defaultRatesLocalStorageValue = () => {
	let localStorageSourceValue = [];
	let localStorageFilterValue = null;

	if (typeof window === 'object' && 'localStorage' in window) {
		if ('smt_rate_data_source' in window.localStorage) {
			localStorageSourceValue = JSON.parse(window.localStorage.getItem('smt_rate_data_source'));
		}

		if ('smt_rate_data_filter' in window.localStorage) {
			localStorageFilterValue = JSON.parse(window.localStorage.getItem('smt_rate_data_filter'));
		}
	}

	return {
		localStorageFilterValue,
		localStorageSourceValue,
	};
};

export default defaultRatesLocalStorageValue;
