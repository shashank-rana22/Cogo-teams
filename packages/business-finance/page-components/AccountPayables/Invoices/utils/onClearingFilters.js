const onClearingFilters = ({ setGlobalFilters = () => {}, entity = '', queryCurr = '' }) => {
	setGlobalFilters({
		pageIndex   : 1,
		pageSize    : 20,
		entity,
		currency    : queryCurr,
		invoiceView : 'coe_accepted',
	});
};

export default onClearingFilters;
