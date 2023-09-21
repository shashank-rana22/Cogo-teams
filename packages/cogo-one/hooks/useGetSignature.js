import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { useMemo } from 'react';

const getSignatureText = ({ userName }) => (
	`
	<br>
	<br>
	<br>
	<br>
	<p>
		<p>Regards</p>
		<p>${userName}</p>
		<p>CogoOne Advisor</p>
		<p>${GLOBAL_CONSTANTS.mobile_number.cogoone_sales_contact_no}</p>
	</p>
	`
);

function useGetSignature() {
	const userName = useSelector(({ profile }) => (profile?.user.name));

	const addSignature = () => {
		const signature = getSignatureText({ userName });

		return signature;
	};

	const signature = useMemo(addSignature, [userName]);

	return {
		signature,
	};
}

export default useGetSignature;
