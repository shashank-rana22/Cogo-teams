const getColumns = () => [
	{
		Header   : 'LEGAL BUSINESS NAME',
		accessor : (item) => <div>{item?.selfOrganizationName || '-'}</div>,
	},
	{
		Header   : 'DUES',
		accessor : (item) => <div>{item?.dues || '-'}</div>,
	},
	{
		Header   : '1 - 30 (DAYS)',
		accessor : (item) => (
			item?.openInvoiceAgeingBucket?.thirty?.ledgerAmount ? (
				<div>
					{item?.openInvoiceAgeingBucket?.thirty?.ledgerCurrency}
					{' '}
					{item?.openInvoiceAgeingBucket?.thirty?.ledgerAmount}
				</div>
			) : '-'
		),
	},
	{
		Header   : '31 - 45 (DAYS)',
		accessor : (item) => (
			item?.openInvoiceAgeingBucket?.fortyFive?.ledgerAmount ? (
				<div>
					{item?.openInvoiceAgeingBucket?.fortyFive?.ledgerCurrency}
					{' '}
					{item?.openInvoiceAgeingBucket?.fortyFive?.ledgerAmount}
				</div>
			) : '-'
		),
	},
	{
		Header   : '46 - 60 (DAYS)',
		accessor : (item) => (
			item?.openInvoiceAgeingBucket?.sixty?.ledgerAmount ? (
				<div>
					{item?.openInvoiceAgeingBucket?.sixty?.ledgerCurrency}
					{' '}
					{item?.openInvoiceAgeingBucket?.sixty?.ledgerAmount}
				</div>
			) : '-'
		),
	},
	{
		Header   : '61 - 90 (DAYS)',
		accessor : (item) => (
			item?.openInvoiceAgeingBucket?.ninety?.ledgerAmount ? (
				<div>
					{item?.openInvoiceAgeingBucket?.ninety?.ledgerCurrency}
					{' '}
					{item?.openInvoiceAgeingBucket?.ninety?.ledgerAmount}
				</div>
			) : '-'
		),
	},
	{
		Header   : '91 - 180 (DAYS)',
		accessor : (item) => (
			item?.openInvoiceAgeingBucket?.oneEighty?.ledgerAmount ? (
				<div>
					{item?.openInvoiceAgeingBucket?.oneEighty?.ledgerCurrency}
					{' '}
					{item?.openInvoiceAgeingBucket?.oneEighty?.ledgerAmount}
				</div>
			) : '-'
		),
	},
	{
		Header   : '181 - 365 (DAYS)',
		accessor : (item) => (
			item?.openInvoiceAgeingBucket?.threeSixtyFive?.ledgerAmount ? (
				<div>
					{item?.openInvoiceAgeingBucket?.threeSixtyFive?.ledgerCurrency}
					{' '}
					{item?.openInvoiceAgeingBucket?.threeSixtyFive?.ledgerAmount}
				</div>
			) : '-'
		),
	},
	{
		Header   : '365+ (DAYS)',
		accessor : (item) => (
			item?.openInvoiceAgeingBucket?.threeSixtyFivePlus?.ledgerAmount ? (
				<div>
					{item?.openInvoiceAgeingBucket?.threeSixtyFivePlus?.ledgerCurrency}
					{' '}
					{item?.openInvoiceAgeingBucket?.threeSixtyFivePlus?.ledgerAmount}
				</div>
			) : '-'
		),
	},
	{
		Header   : 'OPEN INVOICE (AMOUNT)',
		accessor : (item) => (
			item?.openInvoice?.ledgerAmount ? (
				<div>
					{item?.openInvoice?.ledgerCurrency}
					{' '}
					{item?.openInvoice?.ledgerAmount}
				</div>
			) : '-'
		),
	},
	{
		Header   : 'ON ACCOUNT',
		accessor : (item) => (
			item?.onAccount?.ledgerAmount ? (
				<div>
					{item?.onAccount?.ledgerCurrency}
					{' '}
					{item?.onAccount?.ledgerAmount}
				</div>
			) : '-'
		),
	},
	{
		Header   : 'TOTAL OUTSTANDING',
		accessor : (item) => (
			item?.totalOutstanding?.ledgerAmount ? (
				<div>
					{item?.totalOutstanding?.ledgerCurrency}
					{' '}
					{item?.totalOutstanding?.ledgerAmount}
				</div>
			) : '-'
		),
	},
];

export default getColumns;
