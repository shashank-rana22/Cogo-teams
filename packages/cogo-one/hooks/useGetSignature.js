import { useSelector } from '@cogoport/store';

const SALES_CONTACT_NO = '+91-8069182176';

const getSignatureText = ({ userName }) => (
	`<br><br><br><br><div>
		<p>Regards</p>
		<p>${userName}</p>
		<p>CogoOne Advisor</p>
		<p>${SALES_CONTACT_NO}</p>
	</div>`
);

function useGetSignature() {
	const userName = useSelector(({ profile }) => (profile?.user.name));

	const addSignature = () => {
		const signature = getSignatureText({ userName });

		return signature;
	};

	return {
		addSignature,
	};
}

export default useGetSignature;
