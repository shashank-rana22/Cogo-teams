const useLocalStorage = () => {
	const setItems = ({ email, scopes, partner_id }) => {
		// eslint-disable-next-line no-undef
		window.localStorage.setItem('cogo-outlook-token-email-rpa', email);
		// eslint-disable-next-line no-undef
		window.localStorage.setItem(
			'cogo-outlook-token-scopes-rpa',
			JSON.stringify(scopes),
		);
		// eslint-disable-next-line no-undef
		window.localStorage.setItem(
			'cogo-outlook-token-partner-id-rpa',
			partner_id,
		);
	};
	const getItems = () => {
		// eslint-disable-next-line no-undef
		const email = window.localStorage.getItem('cogo-outlook-token-email-rpa');
		// eslint-disable-next-line no-undef
		const scopes = window.localStorage.getItem('cogo-outlook-token-scopes-rpa');
		// eslint-disable-next-line no-undef
		const partner_id = window.localStorage.getItem(
			'cogo-outlook-token-partner-id-rpa',
		);
		return { email, scopes: JSON.parse(scopes), partner_id };
	};

	const removeItems = () => {
		// eslint-disable-next-line no-undef
		window.localStorage.removeItem('cogo-outlook-token-email-rpa');
		// eslint-disable-next-line no-undef
		window.localStorage.removeItem('cogo-outlook-token-scopes-rpa');
		// eslint-disable-next-line no-undef
		window.localStorage.removeItem('cogo-outlook-token-partner-id-rpa');
	};
	return {
		setItems,
		getItems,
		removeItems,
	};
};

export default useLocalStorage;
