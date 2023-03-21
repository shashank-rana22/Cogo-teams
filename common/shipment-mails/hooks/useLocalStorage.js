const useLocalStorage = () => {
	const setItems = ({ email, scopes, partner_id }) => {
		window.localStorage.setItem('cogo-outlook-token-email-rpa', email);
		window.localStorage.setItem(
			'cogo-outlook-token-scopes-rpa',
			JSON.stringify(scopes),
		);
		window.localStorage.setItem(
			'cogo-outlook-token-partner-id-rpa',
			partner_id,
		);
	};
	const getItems = () => {
		const email = window.localStorage.getItem('cogo-outlook-token-email-rpa');
		const scopes = window.localStorage.getItem('cogo-outlook-token-scopes-rpa');
		const partner_id = window.localStorage.getItem(
			'cogo-outlook-token-partner-id-rpa',
		);
		return { email, scopes: JSON.parse(scopes), partner_id };
	};

	const removeItems = () => {
		window.localStorage.removeItem('cogo-outlook-token-email-rpa');
		window.localStorage.removeItem('cogo-outlook-token-scopes-rpa');
		window.localStorage.removeItem('cogo-outlook-token-partner-id-rpa');
	};
	return {
		setItems,
		getItems,
		removeItems,
	};
};

export default useLocalStorage;
