import { Button } from '@cogoport/components';

function JobOpen({
	row = {},
	setDetailsModal = () => {},
}) {
	return (
		<div>
			<Button size="md" themeType="secondary" onClick={() => setDetailsModal(row)}>View</Button>

		</div>
	);
}
export default JobOpen;
