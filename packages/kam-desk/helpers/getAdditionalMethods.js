const getAdditionalMethods = ({ shipmentType, activeTab, stepperTab }) => {
	const addtionalMethod = ['pagination'];

	const mapping = {
		fcl_freight: {
			export: {
				mark_confirmed        : [...addtionalMethod, 'booking_preference'],
				upload_booking_note   : [...addtionalMethod, 'booking_preference', 'booking_status'],
				upload_shipping_order : [...addtionalMethod, 'booking_preference'],
				list_task_pending     : [...addtionalMethod, 'tasks'],
			},
			import: {
				mark_confirmed        : [...addtionalMethod, 'booking_preference'],
				upload_shipping_order : [...addtionalMethod, 'booking_preference'],
				list_task_pending     : [...addtionalMethod, 'tasks'],
			},
			fcl_customs: {
				mark_confirmed: [...addtionalMethod, 'booking_preference'],
			},
			fcl_local: {
				mark_confirmed: [...addtionalMethod, 'booking_preference'],
			},
		},
	};

	return mapping?.[shipmentType]?.[stepperTab]?.[activeTab]
		? mapping[shipmentType][stepperTab][activeTab] : addtionalMethod;
};

export default getAdditionalMethods;
