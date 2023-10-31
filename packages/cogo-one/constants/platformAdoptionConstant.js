export const ACTIVITY_MAPPING = [
	{
		label : 'Chat Pending',
		name  : 'chat_pending',
		isDot : true,
	},
	{
		label : 'Mails Pending',
		name  : 'mail_pending',
		isDot : true,
	},
];

export function KycInfocontent() {
	return (
		<ol>
			<li>Verify the validity of all documents for the KYB process.</li>
			<li>Cross-check the details in the attached document with the information provided by the customer.</li>
			<li>If there are any discrepancies, reject the KYC application and provide a reason.</li>
		</ol>
	);
}

export function DemoInfoContent() {
	return (
		<ol>
			<li>Schedule a demo with the customer and inquire about their preferred time.</li>
			<li>Refer to the tips below to ensure a successful demo presentation.</li>
		</ol>
	);
}

export function TradeInfoContent() {
	return (
		<ol>
			<li>Ensure that all documents are valid for the KYB process.</li>
			<li>Compare the details in the attached document with the information submitted by the customer.</li>
		</ol>
	);
}

export function OrganicInfoContent() {
	return (
		<ol>
			<li>Contact the customer via phone.</li>
			<li>Provide them with access to the platform.</li>
			<li>Schedule a demo with the customer.</li>
		</ol>
	);
}

export function CallInfoContent() {
	return (
		<ol>
			<li>Return the call to the customer as a missed call could be a potential business opportunity.</li>
			<li>If the call is busy or not answered, consider reaching out to the customer via WhatsApp.</li>
		</ol>
	);
}

export function AccountInfoContent() {
	return (
		<ol>
			<li>Verify the valid confirmation from the customer regarding the allocation of their account.</li>
			<li>
				Check if the current agent has not been in touch with the customer for more than 30 days and there
				have been no shipments during that period.
			</li>
		</ol>
	);
}
