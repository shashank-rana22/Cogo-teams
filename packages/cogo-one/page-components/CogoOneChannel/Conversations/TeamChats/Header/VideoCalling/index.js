import { ButtonGroup } from '@cogoport/components';

import { getButtonGroups } from '../../../../../../constants/teamsHeaderMappings';
import useUpdateVideoConference from '../../../../../../hooks/useUpdateVideoConference';

function VideoCalling({
	activeTab = {},
	searchName = '',
	isGroup = false,
}) {
	const { loading, updateVideoConference = () => {} } = useUpdateVideoConference();

	const { groupData = {} } = activeTab || {};

	const { id = '', group_members_ids = [] } = groupData || {};

	const onClickFunc = ({ isVideoOn = false }) => {
		updateVideoConference({
			groupId        : id,
			groupMemberIds : group_members_ids,
			searchName,
			isGroup,
			isVideoOn,
		});
	};

	const buttonsMappings = getButtonGroups({ onClickFunc });

	return (
		<ButtonGroup
			size="xs"
			disabled={loading}
			options={buttonsMappings}
		/>
	);
}

export default VideoCalling;
