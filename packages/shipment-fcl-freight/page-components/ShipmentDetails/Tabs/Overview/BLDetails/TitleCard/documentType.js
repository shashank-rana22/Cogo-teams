const documentType = (bl_doc_type) => {
	let doc_type = 'HBL';
	if (bl_doc_type === 'draft_bill_of_lading') {
		doc_type = 'MBL';
	}

	return { doc_type };
};

export default documentType;
