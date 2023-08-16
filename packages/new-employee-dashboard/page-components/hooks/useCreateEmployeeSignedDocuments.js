import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const INDEX = 0;

const getPayload = ({ employee_detail_id, selectedItems, additional_clause }) => {
	const signed_documents = (selectedItems || []).map((item) => item.name);
	signed_documents.splice(INDEX, signed_documents.length, ...new Set(signed_documents));

	const signed_document_names = (signed_documents || []).map((name) => ({
		name,
		additional_clause: name === 'Employment Agreement'
			? additional_clause?.[employee_detail_id] || undefined : undefined,
	}));

	return {
		employee_detail_id,
		signed_document_names,
	};
};

const useCreateEmployeeSignedDocuments = ({
	id: employee_detail_id,
	getEmployeeDetails = () => {},
	selectedItems,
	setSelectedItems,
}) => {
	const profile = useSelector((state) => state.profile);
	const { additional_clause } = profile || {};

	const [{ loading: btnloading }, trigger] = useHarbourRequest({
		url    : '/create_employee_signed_document',
		method : 'POST',
	}, { manual: true });

	const createEmployeeSignedDocumentsStatus = async () => {
		try {
			const payload = getPayload({
				employee_detail_id,
				selectedItems,
				additional_clause,
			});

			await trigger({
				data: payload,
			});

			getEmployeeDetails(employee_detail_id);
			setSelectedItems([]);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		btnloading,
		createEmployeeSignedDocumentsStatus,
	};
};

export default useCreateEmployeeSignedDocuments;
