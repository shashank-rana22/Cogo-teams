// eslint-disable-next-line import/no-named-as-default
import useAddServicePoc from './hooks/useAddServicePoc';

function ShowPocForm() {
	const {
		controls,
	} = useAddServicePoc();
	return (
		<h3>ADD POC</h3>

	);
}

export default ShowPocForm;
