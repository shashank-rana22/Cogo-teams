const documentType = (bl_doc_type) => {
	let doc_type = 'HBL';
	if (bl_doc_type === 'draft_bill_of_lading') {
		doc_type = 'MBL';
	} else if (bl_doc_type === 'draft_house_airway_bill') {
		doc_type = 'HAWB';
	} else if (bl_doc_type === 'draft_airway_bill') {
		doc_type = 'MAWB';
	}

	return { doc_type };
};

export default documentType;
