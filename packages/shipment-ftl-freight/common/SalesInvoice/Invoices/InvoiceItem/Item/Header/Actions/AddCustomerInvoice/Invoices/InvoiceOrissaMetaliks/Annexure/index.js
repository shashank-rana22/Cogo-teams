import formatDate from '@cogoport/globalization/utils/formatDate';

import { getAnnexureData } from '../getLineItems';

function Annexure({
	invoice_no = '',
	invoice_date = '',
	total_weight = '',
	total = '',
	customData = {},
}) {
	const { ANNEXURE_KEY_MAPPINGS = {}, annexureItems = [] } = getAnnexureData({
		customData,
	});

	return (
		<table
			border="0"
			cellPadding="0"
			cellSpacing="0"
			style={{
				width          : '80%',
				border         : '2px solid black',
				marginTop      : '50px',
				borderCollapse : 'collapse',
			}}
		>
			<tr
				style={{ border: '2px solid black', textAlign: 'center' }}
			>
				<td colSpan="10">
					<h1>Annexure</h1>
				</td>
			</tr>
			<tr style={{ border: '2px solid black' }}>
				<th style={{ border: '2px solid black', padding: '10px' }}>TRIP ID</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Date</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Truck No</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>GCN No</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Permit No</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>From</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>To</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Tonne</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Rate per tonne</th>
				<th style={{ border: '2px solid black', padding: '10px' }}>Total Amount</th>
			</tr>
			{annexureItems.map((annexureItem) => (
				<tr key={annexureItem?.id} style={{ border: '2px solid black' }}>
					{Object.keys(ANNEXURE_KEY_MAPPINGS).map((key) => (
						<td style={{ padding: '1px', border: '2px solid black' }} key={key}>
							{annexureItem[key]}
						</td>
					))}
				</tr>
			))}

			<tr>
				<td colSpan="5" style={{ border: '2px solid black', padding: '0 8px' }}>
					<b>
						INV NO:
						&nbsp;
						{invoice_no}
						&nbsp;
						DATE:
						&nbsp;
						{invoice_date
							? formatDate({ date: invoice_date, formatType: 'date' })
							: ''}
						&nbsp;
					</b>
				</td>
				<td colSpan="2" style={{ border: '2px solid black', padding: '0 8px' }}>
					<b>TOTAL</b>
				</td>
				<td style={{ border: '2px solid black', padding: '0 8px' }}>{total_weight}</td>
				<td aria-label="table-cell" />
				<td style={{ border: '2px solid black', padding: '0 8px' }}>{total}</td>
			</tr>
		</table>
	);
}

export default Annexure;
