import { isEmpty, startCase } from '@cogoport/utils';

function Details({ data = [] }) {
	const mapping = (val = {}) => ({
		Service                 : startCase(val.invoice_preference_service || ''),
		'Billing Party Name'    : val.billing_party || '',
		'Invoicing Party'       : val.invoicing_party || '',
		Email                   : val.invoice_preference_email || '',
		'Billing Party Address' : val.billing_party_address || '',
		Name                    : val.invoice_preference_name,
		'Contact Number':
		`${val?.invoice_preference_country_code || ''} ${val?.invoice_preference_contact_no || ''}`,
	});

	const columns = [
		['Service'],
		['Billing Party Name', 'Invoicing Party', 'Email'],
		['Billing Party Address', 'Name', 'Contact Number'],
	];

	function LabelValue({ label, value }) {
		return !isEmpty(value) ? (
			<div>
				<div>{label}</div>
				<div>{value}</div>
			</div>
		) : null;
	}

	return (
		<div>
			{data.map((item) => {
				const mapping_data = mapping(item.sop_detail || {});

				return (
					<div>
						{columns.map((col) => col.map((key) => <LabelValue label={key} value={mapping_data[key]} />))}
					</div>
				);
			})}
		</div>
	);
}

export default Details;
