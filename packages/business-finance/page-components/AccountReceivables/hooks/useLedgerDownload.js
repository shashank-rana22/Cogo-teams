import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import toastApiError from '../../commons/toastApiError.ts';

const convertDate = (dateToConvert) => formatDate({
	date       : dateToConvert,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	formatType : 'date',
});

const useLedgerDownload = ({ date, entities, item, setShowLedgerModal }) => {
	const { profile } = useSelector((state) => state || {});

	const { startDate, endDate } = date || {};
	const { businessName, organizationId } = item;

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/report/ar-ledger',
			method  : 'get',
			authKey : 'get_payments_report_ar_ledger',
		},
		{ manual: true },
	);

	const downloadLedger = async () => {
		try {
			const response = await trigger({
				params: {
					orgId       : organizationId,
					startDate   : convertDate(startDate),
					endDate     : convertDate(endDate),
					orgName     : businessName,
					requestedBy : profile?.user?.id,
					entityCodes : entities,
				},
			});

			const { data: responseData } = response || {};
			const downloadUrl = responseData?.toString();

			if (!isEmpty(downloadUrl)) {
				window.open(downloadUrl);
				setShowLedgerModal(false);
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		downloadLedger,
		loading,
		data,
	};
};

export default useLedgerDownload;
