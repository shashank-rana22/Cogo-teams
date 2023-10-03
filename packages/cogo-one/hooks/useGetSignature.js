import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { useMemo } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

const getSignatureText = ({ userName, designation }) => (
	`
	<p>
		<p>Regards</p>
		<p>${userName}</p>
		<p>${designation}</p>
		<p>${GLOBAL_CONSTANTS.mobile_number.cogoone_sales_contact_no}</p>
	</p>
	`
);

function useGetSignature({ viewType = '' }) {
	const userName = useSelector(({ profile }) => (profile?.user.name));

	const designation = VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.email_signature_designation || 'CogoOne Advisor';

	const addSignature = () => {
		const signature = getSignatureText({ userName, designation });

		return signature;
	};

	const signature = useMemo(addSignature, [designation, userName]);

	return {
		signature,
	};
}

export default useGetSignature;
