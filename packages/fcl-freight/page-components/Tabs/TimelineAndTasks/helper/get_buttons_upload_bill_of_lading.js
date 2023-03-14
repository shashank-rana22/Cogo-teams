const taskName = 'upload_doc';

const getButton = (type, isLast = false) => {
	return {
		name: `step-${taskName}-${type}`,
		text: isLast ? 'SUBMIT' : 'NEXT',
		props: { className: 'secondary sm' },
	};
};

const configs = (data, shipment_data) => {
	const config = {
		hbl: {
			upload_bill_of_lading: {
				docs: ['house_bill_of_lading', 'bill_of_lading'],
			},
			upload_draft_bill_of_lading: {
				docs: ['draft_house_bill_of_lading', 'draft_bill_of_lading'],
			},
		},
		mbl: {
			upload_bill_of_lading: {
				docs: ['bill_of_lading'],
			},
			upload_draft_bill_of_lading: {
				docs: ['draft_bill_of_lading'],
			},
		},
		inhouse_hbl: {
			upload_bill_of_lading: {
				docs: ['bill_of_lading'],
			},
			upload_draft_bill_of_lading: {
				docs: ['draft_bill_of_lading'],
			},
		},
		agent_hbl: {
			upload_bill_of_lading: {
				docs: ['bill_of_lading'],
			},
			upload_draft_bill_of_lading: {
				docs: ['draft_bill_of_lading'],
			},
		},
	};
	const bl_category = shipment_data?.bl_category?.toLowerCase() || 'mbl';
	if (bl_category === 'hbl' && data?.is_house_doc_uploaded) {
		return config?.mbl?.[data?.task];
	}
	return config[bl_category]?.[data?.task];
};

const fromDocsConfig = (data) => {
	const config = {
		upload_house_bill_of_lading: {
			docs: ['house_bill_of_lading'],
		},
		upload_draft_house_bill_of_lading: {
			docs: ['draft_house_bill_of_lading'],
		},
		upload_bill_of_lading: {
			docs: ['bill_of_lading'],
		},
		upload_draft_bill_of_lading: {
			docs: ['draft_bill_of_lading'],
		},
	};
	return config[data?.task] || {};
};

const getButtonsBillOfLading = (data, shipment_data) => {
	const fromDocs = data?.fromDocs;
	const { docs } = fromDocs
		? fromDocsConfig(data) || {}
		: configs(data, shipment_data) || {};
	const buttons = docs?.map((docType, index) => {
		const isLast = index === docs.length - 1;
		return getButton(docType, isLast, data, shipment_data);
	});

	return buttons;
};

export default getButtonsBillOfLading;
