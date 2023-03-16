import useListMailDetails from '../../../../hooks/useGetMail';

function MailConversation({ activeMail }) {
	const { data } = useListMailDetails({ activeMail });
	console.log('data:', data);

	return (
		<div>
			<h5>dfhjrklfm,dv</h5>
		</div>
	);
}

export default MailConversation;
