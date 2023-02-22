import ServiceForm from '../ServiceForm';
import ShowPocForm from '../ShowPocForm';

const emptyForm = () => (
	<div />
);

const COMPONENT_MAPPING = {
	pocForm     : ShowPocForm,
	serviceForm : ServiceForm,
	empty       : emptyForm(),
};

export default COMPONENT_MAPPING;
