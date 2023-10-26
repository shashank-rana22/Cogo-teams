import { Placeholder, Pill } from '@cogoport/components';

function GetPill({ loading = false, content = 0, color = '' }) {
	if (loading) {
		return <Placeholder height="20px" width="80px" />;
	}
	if (content) {
		return (
			<Pill color={color}>
				{content}
			</Pill>
		);
	}
	return <Pill color="red">NO DATA FOUND</Pill>;
}

export default GetPill;
