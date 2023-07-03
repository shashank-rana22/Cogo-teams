import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const MAPPING = {
	squad       : 'employee',
	tribe       : 'squad',
	chapter     : 'sub_chapter',
	sub_chapter : 'employee',
};

const useUpdateComponent = ({ fetchList, setShowCreateModal, showCreateModal, source = 'tribe' }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : `/update_${source}`,
	}, { manual: true });

	const payloadId = `${source}_id`;

	const onClickUpdateButton = async (values) => {
		const dataaa = [MAPPING?.[source]];

		const ARRAY_OF_IDS = (showCreateModal?.[`${dataaa}s`] || []).map((obj) => obj?.id);

		const fields_added = (values?.[`${dataaa}_ids`] || []).filter(
			(id) => !(ARRAY_OF_IDS || []).includes(id),
		);
		const fields_removed = (ARRAY_OF_IDS || []).filter(
			(id) => !(values?.[`${dataaa}_ids`] || []).includes(id),
		);

		const idsAdded = `${dataaa}s_added`;
		const idsRemoved = `${dataaa}s_removed`;
		const name = [`${source}_name`];
		const leaderId = [`${source}_leader`];

		try {
			await trigger({
				data: {
					[payloadId]  : showCreateModal?.id,
					[idsAdded]   : fields_added,
					[idsRemoved] : fields_removed,
					[name]       : values?.[`${source}_name`],
					[leaderId]   : values?.[leaderId],

				},
			});
			Toast.success(`${source} has been updated successfully`);
			setShowCreateModal(false);
			fetchList();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		onClickUpdateButton,
		loading,
	};
};

export default useUpdateComponent;
