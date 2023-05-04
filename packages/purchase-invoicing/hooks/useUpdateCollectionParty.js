import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const useUpdateColletctionParty = ({ onClose }) => {
	const { user_profile = {} } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const [loading, setLoading] = useState(false);

	const [{ loading: apiLoading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills',
			method  : 'put',
			authKey : 'put_purchase_bills',
		},
		{ manual: true },
	);

	const updateCp = async (values) => {
		setLoading(true);
		try {
			const res = await trigger({
				data: {
					performedByUserType:
                        user_profile.session_type === 'partner' ? 'AGENT' : 'USER',
					serviceProviderType : 'freight_forwarder',
					updatedBy           : user_profile.id,
					bill                : {
						id         : values?.id,
						billStatus : values?.status,
						billType   : values?.billType,
					},
					mappings       : values?.mappings,
					billAdditional : {
						isDeviationAccepted  : values?.is_deviation_accepted,
						exchangeRateDocument : values?.exchange_rate_document
							? values?.exchange_rate_document
							: undefined,
					},
				},
			});
			if (!res.hasError) {
				Toast.success('Bill Updated SucessFully');
				setLoading(false);
				onClose();
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.data));
			setLoading(false);
		}
	};

	return {
		updateCp,
		loading: loading || apiLoading,
	};
};

export default useUpdateColletctionParty;
