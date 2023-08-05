import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const getPayload = ({ values = {}, performedById = '', userType = '', organizationId = '' }) => {
	const { currency = '', amount = '' } = values || {};

	return {
		organization_id   : organizationId,
		service_name      : 'COGO_ONE',
		source            : 'SUBSCRIPTION',
		currency,
		amount,
		performed_by_id   : performedById,
		performed_by_type : userType === 'partner' ? 'user' : 'agent',
	};
};

function useCreatePaymentLink({ organizationData = {} }) {
	const { id : organizationId = '' } = organizationData || {};

	const {
		performedById,
		userType,
	} = useSelector(({ profile }) => ({
		performedById : profile.user.id,
		userType      : profile.user.session_type,
	}));

	const [showLink, setShowLink] = useState({ show: false, link: '' });

	const [{ loading }, trigger] = useRequest({
		url    : '/create_payment_link',
		method : 'post',
	}, { manual: true });

	const createLink = async ({ values = {} }) => {
		try {
			const response = await trigger({
				data: getPayload({
					values,
					performedById,
					userType,
					organizationId,
				}),
			});
			const { link = '' } = response?.data || {};
			setShowLink({ show: true, linkUrl: link });
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
			setShowLink({ show: true, linkUrl: 'It is pending from backend' });
		}
	};

	return {
		createLink,
		createLinkloading: loading,
		showLink,
	};
}
export default useCreatePaymentLink;
