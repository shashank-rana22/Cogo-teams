import { Table } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

const getFieldName = (key) => {
	if (key === 'preferred_mode_of_document_execution') {
		return 'Mode of Delivery';
	}

	if (key.includes('invoice_preference_')) {
		return startCase(key.replace('invoice_preference_', ''));
	}

	return startCase(key);
};

const formatDate = (value) => {
	const findIndex = value.indexOf('T');
	return value.substring(0, findIndex);
};

function HistoryTable({ data = {}, loading = false }) {
	const { list = [] } = data;

	const formatData = [];

	list.forEach((eachAudit) => {
		if (!isEmpty(eachAudit?.data)) {
			Object.keys(eachAudit?.data).forEach((key) => {
				const temp = {
					field             : getFieldName(key),
					old_value         : startCase(eachAudit?.data?.[key]?.old_value || ''),
					new_value         : startCase(eachAudit?.data?.[key]?.new_value || ''),
					performed_by_user : eachAudit?.performed_by_user?.name || '',
					updated_at        : formatDate(eachAudit?.updated_at),
				};
				formatData.push(temp);
			});
		}
	});

	const columns = [
		{ Header: 'Modified Date', accessor: 'updated_at' },
		{ Header: 'Modified By', accessor: 'performed_by_user' },
		{ Header: 'Field', accessor: 'field' },
		{ Header: 'New Value', accessor: 'new_value' },
		{ Header: 'Old Value', accessor: 'old_value' },
	];

	return (
		<div style={{ overflow: 'auto' }}>
			<Table
				columns={columns}
				data={formatData}
				layoutType="block"
				loading={loading}
			/>
		</div>
	);
}

export default HistoryTable;
