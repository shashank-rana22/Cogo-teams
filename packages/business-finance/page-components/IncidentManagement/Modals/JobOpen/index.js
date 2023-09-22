import { Button } from '@cogoport/components';

function JobOpen({
	row = {},
	setDetailsModal = () => {},
}) {
	return (
		<Button size="md" themeType="secondary" onClick={() => setDetailsModal(row)}>View</Button>
	);
}
export default JobOpen;
