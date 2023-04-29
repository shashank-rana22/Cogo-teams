import AssignToForm from '../page-components/CogoOneChannel/Conversations/Messages/ModalContent/AssignToForm';
import InstantMessages from '../page-components/CogoOneChannel/Conversations/Messages/ModalContent/InstantMessages';
import MarkAsClosed from '../page-components/CogoOneChannel/Conversations/Messages/ModalContent/MarkAsClosed';

const MODAL_COMPONENT_MAPPING = {
	assign           : { comp: AssignToForm, title: { name: 'Assign' }, modalSize: 'md' },
	instant_messages : {
		comp  : InstantMessages,
		title : {
			img  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/instant_messages.svg',
			name : 'Manage replies',

		},
		modalSize: 'xs',

	},
	mark_as_closed: { comp: MarkAsClosed, title: { name: 'feedback' }, modalSize: 'xs' },
};
export default MODAL_COMPONENT_MAPPING;
