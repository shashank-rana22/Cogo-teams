import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const useGetTdsData = ({
	data = {},
	organization = {},
	refetch = () => {},
	setDetailsModal = () => {},
	row = {},
	id = '',
	cNCategoryValues = { CNType: '', CNValues: '', remarks: '' },
	remark = '',
	isConsolidated = false,
	creditNoteApprovalType = '',
	level2 = {},
	t,
}) => {
	const { user_id: userId } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const getDateFormat = ({ date = '' }) => {
		const [d, month, year] = date.split('-');
		return `${year}-${month}-${d}`;
	};

	const formattedData = row.type === 'TDS_APPROVAL' ? {
		...(data || {}),
		tdsRequest: {
			...(data?.tdsRequest || {}),
			validFrom : getDateFormat({ date: data?.tdsRequest?.validFrom }),
			validTo   : getDateFormat({ date: data?.tdsRequest?.validTo }),
		},

	} : data;

	const { CNType, CNValues, remarks } = cNCategoryValues || {};

	const creditNoteRemarks = CNValues === 'revenueOthers' || CNValues === 'nonRevenueOthers'
		? remarks
		: CNValues;

	const payloadKey = isConsolidated ? 'consolidatedCreditNoteRequest' : 'creditNoteRequest';

	const [
		{ loading },
		trigger,
	] = useRequestBf(
		{
			url     : `/incident-management/incident/${id}`,
			method  : 'patch',
			authKey : 'patch_incident_management_incident_by_id',
		},
		{ manual: true },
	);

	const useOnAction = async ({ status }) => {
		const payload = row.type !== 'TDS_APPROVAL'
			? {
				data: {
					[payloadKey]: {
						...row.data?.[payloadKey],
						creditNoteType         : CNType,
						creditNoteRemarks,
						creditNoteApprovalType : isEmpty(creditNoteApprovalType) ? null : creditNoteApprovalType,
					},
					organization,
				},
			}
			: null;

		if (
			((CNType || level2) && (creditNoteRemarks || remark))
			|| status === 'REJECTED'
			|| row.type === 'TDS_APPROVAL'
		) {
			try {
				const apiResponse = await trigger({
					data: {
						data      : formattedData,
						remark    : remark || 'Approved',
						status,
						updatedBy : userId,
						...payload,
					},
				});
				const {
					data: { message },
				} = apiResponse;
				if (message === 'Updated Successfully') {
					Toast.success(t('incidentManagement:request_updated_successfully_message'));
					setDetailsModal(null);
					refetch();
				} else {
					Toast.error(message);
				}
			} catch (e) {
				Toast.error(e?.response?.data?.message);
			}
		} else {
			Toast.error(t('incidentManagement:select_credit_note_category_message'));
		}
	};

	return {
		useOnAction,
		loading,
	};
};

export default useGetTdsData;
