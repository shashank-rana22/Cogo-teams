import CardComponent from './CardComponent';

const COMPONENT_MAPPING = {
	demand: {
		name      : 'demand',
		title     : 'SALES',
		component : CardComponent,
	},
	// supply: {
	// 	name      : 'supply',
	// 	title     : 'SUPPLY',
	// 	component : CardComponent,
	// },
	cogoport: {
		name      : 'cogoport',
		title     : 'COGOPORT',
		component : CardComponent,
	},
	// approval_pending: {
	// 	name      : 'approval_pending',
	// 	title     : 'APPROVAL PENDING',
	// 	component : Details,
	// },
	multi_entity_margin: {
		name  : 'multi_entity_margin',
		title : 'MultiEntity Margin',
		// component : Details,
	},
};

export default COMPONENT_MAPPING;
