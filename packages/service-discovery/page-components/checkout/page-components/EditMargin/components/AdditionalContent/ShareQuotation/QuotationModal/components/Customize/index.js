import { useSelector } from '@cogoport/store';

import getPrefilledValues from './getPrefilledValues';

function Customize({ detail, organization }) {
	const { agent_id } = useSelector(({ profile }) => ({
		agent_id: profile?.id,
	}));

	const prefilledValues = getPrefilledValues(detail, [
		organization?.agent_id,
		agent_id,
	]);
}

export default Customize;
