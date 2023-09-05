export default function lineItems(filters, updateBal) {
	return (
		[{
			entityCode   : filters?.entityCode || '',
			accMode      : filters?.accMode || '',
			glCode       : '',
			tradePartyId : filters?.tradeParty || '',
			type         : 'CREDIT',
			amount       : updateBal || '',
		},
		{
			entityCode   : filters?.entityCode || '',
			accMode      : filters?.accMode || '',
			glCode       : '',
			tradePartyId : filters?.tradeParty || '',
			type         : 'DEBIT',
			amount       : updateBal || '',
		}]
	);
}
