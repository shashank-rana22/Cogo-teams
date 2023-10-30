function getDetails({ saasUtrUploadRequest = {} }) {
	const {
		entity_code = '',
		job_id = '',
		currency = '',
		bank_account_number = '',
		bank_name = '',
		expected_amount = '',
	} = saasUtrUploadRequest || {};

	return [
		{ title: <div>Entity Code</div>, value: <div>{entity_code || ''}</div> },
		{ title: <div>Order Id</div>, value: <div>{job_id || ''}</div> },
		{ title: <div>Bank Name</div>, value: <div>{bank_name || ''}</div> },
		{ title: <div>Bank Account Number</div>, value: <div>{bank_account_number || ''}</div> },
		{
			title: <div>Currency</div>, value: <div>{currency || ''}</div>,
		},
		{
			title: <div>Expected Amount</div>, value: <div>{expected_amount || ''}</div>,
		},

	];
}
export default getDetails;
