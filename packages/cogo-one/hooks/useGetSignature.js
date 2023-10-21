import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { useMemo } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

const getSignatureText = ({ userName = '', designation = '', contactNumber = '' }) => (
	`
	<div>
		<div>Regards</div>
		<div>${userName}</div>
		<div>${designation}</div>
		<div>${contactNumber}</div>
	</div>
	`
);

function useGetSignature({ viewType = '' }) {
	const userName = useSelector(({ profile }) => (profile?.user.name));

	const designation = VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.email_signature_designation || 'CogoOne Advisor';

	const contactNumber = (
		VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.contact_number
		|| GLOBAL_CONSTANTS.mobile_number.cogoone_sales_contact_no
	);

	const addSignature = () => {
		const signature = getSignatureText({ userName, designation, contactNumber });

		return signature;
	};

	const signature = useMemo(addSignature, [designation, contactNumber, userName]);

	return {
		signature,
	};
}

export default useGetSignature;
