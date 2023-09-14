const styles = {
	first_container: {
		display   : 'flex',
		border    : '1px solid black',
		minHeight : '200px',
	},
	invoice_type: {
		width          : '70%',
		border         : '1px solid black',
		padding        : '15px',
		textAlign      : 'right',
		display        : 'flex',
		justifyContent : 'space-between',
	},
	customer_info: {
		width   : '30%',
		border  : '1px solid black',
		padding : '12px 0 0 6px',
	},
	proforma: {
		margin    : '35px',
		textAlign : 'left',
		fontSize  : '22px',
	},

	second_container: {
		display   : 'flex',
		border    : '1px solid black',
		minHeight : '225px',
	},

	billing_party_details: {
		width  : '30%',
		border : '1px solid black',
	},
	billing_party_address: {
		width  : '20%',
		border : '1px solid black',
	},
	bank_details: {
		width  : '20%',
		border : '1px solid black',
	},
	invoice_details: {
		width  : '30%',
		border : '1px solid black',
	},

	third_container: {
		border: '1px solid black',
	},
	column_headings: {
		border    : '1px solid black',
		display   : 'flex',
		minHeight : '25px',
		fontSize  : '15px',
		width     : '100%',
	},
	item_label: {
		fontWeight : '700',
		width      : '10%',
		border     : '1px solid black',
		textAlign  : 'center',
	},
	line_items_array: {
		border    : '1px solid black',
		display   : 'flex',
		minHeight : '25px',
		fontSize  : '15px',
		width     : '100%',
	},
	item: {
		width     : '12%',
		minHeight : '17px',
		border    : '0.5px solid black',
	},
	total_amount: {
		border    : '1px solid black',
		display   : 'flex',
		minHeight : '25px',
		fontSize  : '15px',
		width     : '22.3%',
	},

	fourth_container: {
		border: '1px solid black',
	},
	amount: {
		width     : '70%',
		border    : '1px solid black',
		textAlign : 'left',
		minHeight : '90px',
		padding   : '10px',
	},
	tax: {
		width     : '30%',
		border    : '1px solid black',
		textAlign : 'left',
		minHeight : '90px',
		padding   : '10px',
	},
	remarks: {
		display        : 'flex',
		justifyContent : 'flex-start',
		padding        : '10px',
		border         : '1px solid black',
		minHeight      : '130px',
		width          : '70%',
	},
	signature: {
		width     : '30%',
		border    : '1px solid black',
		minHeight : '130px',
		padding   : '10px',
	},

};
export default styles;
