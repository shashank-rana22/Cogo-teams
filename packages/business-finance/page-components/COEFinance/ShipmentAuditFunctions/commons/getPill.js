import { Placeholder, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

function GetPill({ loading = false, content = 0, color = '' }) {
	if (loading) {
		return <Placeholder height="20px" width="80px" />;
	}
	if (content) {
		return (
			<Pill color={color}>
				{typeof content !== 'string' ? startCase(content) : content}
			</Pill>
		);
	}
	return <Pill color="red">NO DATA FOUND</Pill>;
}

export default GetPill;
