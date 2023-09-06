const ONE_OPTION = 1;

const getRefundAdvanceDocumentData = ({ viewRefundModal:{ data = {} } = {} }) => {
	const { details = {}, currency = '', paymentMode = '' } = data || {};
	const { numberOfContainers = '', amountPerContainer = '' } = details || {};
	return (
		[
			{ title: 'Amount', value: `${currency} ${amountPerContainer}` },
			{
				title : 'Date',
				value : `${numberOfContainers} Container${numberOfContainers > ONE_OPTION ? 's' : ''}`,
			},
			{
				title : 'UTR Number',
				value : `${currency} ${(amountPerContainer && numberOfContainers)
					? amountPerContainer * numberOfContainers : ''}`,
			},
			{ title: 'Proof', value: paymentMode },
		]
	);
};

export default getRefundAdvanceDocumentData;
