import EditPOCForm from '../../EditPOCForm';
import ServiceForm from '../../ServiceForm';
import ShowPocForm from '../../ShowPocForm';

const COMPONENT_MAPPING = {
	pocForm: {
		Component: ShowPocForm,
	},
	serviceForm: {
		Component: ServiceForm,
	},
	editPOCForm: {
		Component: EditPOCForm,
	},
};

export default COMPONENT_MAPPING;
