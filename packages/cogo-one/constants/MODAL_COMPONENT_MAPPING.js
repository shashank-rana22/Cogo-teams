import AssignToForm from '../page-components/Conversations/Messages/ModalContent/AssignToForm';
import InstantMessages from '../page-components/Conversations/Messages/ModalContent/InstantMessages';

const MODAL_COMPONENT_MAPPING = {
	assign           : { comp: AssignToForm, title: { name: 'Assign' } },
	instant_messages : {
		comp  : InstantMessages,
		title : {
			img  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/instant_messages.svg',
			name : 'Manage replies',
		},

	},
};
export default MODAL_COMPONENT_MAPPING;
