export default function getLineItems({ filters, updateBal }) {
	return (
		[{
			entityCode   : filters?.entityCode || '',
			accMode      : '',
			glCode       : '',
			tradePartyId : filters?.tradeParty || '',
			type         : 'CREDIT',
			amount       : Math.abs(updateBal) || '',
		},
		{
			entityCode   : filters?.entityCode || '',
			accMode      : '',
			glCode       : '',
			tradePartyId : '',
			type         : 'DEBIT',
			amount       : Math.abs(updateBal) || '',
		}]
	);
}
