import Docs from './Docs';

function ExistingInventory({ docs, loading, prefrences, setPrefrences }) {
	const hasExistingRates = () => {
		if (!loading) {
			let hasdata = false;
			const keys = Object.keys(docs || {});
			(keys || []).forEach((key) => {
				if (Object.keys(docs[key]).length) {
					hasdata = true;
				}
			});
			return hasdata;
		}

		return true;
	};
	return (
		hasExistingRates() && <Docs data={docs} preferences={prefrences} setPreferences={setPrefrences} />
	);
}
export default ExistingInventory;
