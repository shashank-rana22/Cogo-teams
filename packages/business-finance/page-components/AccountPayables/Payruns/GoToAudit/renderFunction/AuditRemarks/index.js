import { Input } from '@cogoport/components';

function AuditRemarks({ item = {}, remarks = [], setRemarks = () => {} }) {
	if (item?.remarks) return <div>{item?.remarks}</div>;

	const handleRemarkChange = (itemData, value) => {
		setRemarks((p) => {
			const newValue = { ...p };
			newValue[itemData?.id] = value;
			return newValue;
		});
	};

	return (
		<Input
			placeholder="Invoice Approved..."
			onChange={(e) => handleRemarkChange(item, e.target.value)}
			value={remarks?.[item?.id]}
		/>
	);
}

export default AuditRemarks;
