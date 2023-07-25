import { Toast } from '@cogoport/components';
import { useState } from 'react';

import getDistinctOptions from '../../../../helpers/getDistinctOptions';
import useListOrganizationUsers from '../../../../hooks/useListOrganizationUsers';

const useHandleChangeExecutive = ({
	onUpdate,
	user_id,
	branch_id,
	isChannelPartner,
	data,
	setShowEditContact,
}) => {
	const [searchValue, setSearchValue] = useState('');

	const [selectedUser, setSelectedUser] = useState(data.id);

	const {
		debounceQuery,
		users = {},
		usersLoading,
	} = useListOrganizationUsers({ user_id, isChannelPartner, branch_id });

	const { list = [] } = users;

	const onCreate = async () => {
		if (!selectedUser) {
			Toast.warn('Please select an operations executive first!');
		} else {
			const values = {
				importer_exporter_poc_id: selectedUser,
			};

			await onUpdate(values, true);
			// trackEvent(PARTNER_EVENT.checkout_added_ops_executive, {  //TODO
			// 	checkout_id,
			// 	ops_exec_name: usersList.find((ele) => ele.user_id === selectedUser)
			// 		.name,
			// 	ops_exec_email: usersList.find((ele) => ele.user_id === selectedUser)
			// 		.email,
			// });

			setShowEditContact(false);
		}
	};

	const options = getDistinctOptions(list || [], 'user_id').map(
		(item) => ({
			label : `${item.name} (${item.email})`,
			value : item?.user_id,
		}),
	);

	const handleChange = (val) => {
		setSearchValue(val);
		debounceQuery(val);
	};

	return {
		setSelectedUser,
		selectedUser,
		searchValue,
		handleChange,
		usersLoading,
		onCreate,
		options,
	};
};

export default useHandleChangeExecutive;
