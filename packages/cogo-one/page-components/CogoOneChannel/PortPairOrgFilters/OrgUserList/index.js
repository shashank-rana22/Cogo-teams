import { Placeholder, Checkbox, Button, cl } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import UserAvatar from '../../../../common/UserAvatar';
import useListOrgUsers from '../../../../hooks/useListOrgUsers';

import styles from './styles.module.css';

const LOADER_COUNT = 4;

function OrgUsersList({
	setActiveTab = () => {},
	listServiceProviders = [],
	setListServiceProviders = () => {},
	setModalType = () => {},
	setSelectedUsers = () => {},
	selectedUsers = {},
	setOpenSpContacts = () => {},
	modalType = '',
}) {
	const {
		formattedOrgUsersList = [],
		loading = false,
		handleScroll = () => {},
	} = useListOrgUsers({ organizationId: listServiceProviders });

	const onCardClick = ({ item }) => {
		const {
			organization_id,
			user_id,
			userName,
			whatsapp_number_eformat,
			email,
			countryCode,
			mobile_no,
		} = item || {};

		setActiveTab((prev) => ({
			...prev,
			hasNoFireBaseRoom : true,
			data              : {
				organization_id,
				user_id,
				user_name    : userName,
				whatsapp_number_eformat,
				email,
				channel_type : 'whatsapp',
				countryCode,
				mobile_no,
			},
			activeTab: 'message',
		}));
		setOpenSpContacts(false);
		setListServiceProviders([]);
	};

	const handleCheckedChats = ({ eachUser = {}, user_id = '' }) => {
		if (user_id in selectedUsers) {
			setSelectedUsers((prev) => {
				const arg = prev;
				delete (arg[user_id]);
				return { ...prev };
			});
		} else {
			setSelectedUsers((prev) => ({ ...prev, [user_id]: eachUser }));
		}
	};

	const modifiedList = loading ? [...Array(LOADER_COUNT).fill({})] : formattedOrgUsersList;

	return (
		<div className={cl`${styles.container} ${!modalType || isEmpty(modifiedList) ? styles.empty_list : ''}`}>
			<div className={styles.list_container} onScroll={handleScroll}>
				{!isEmpty(modifiedList) ? modifiedList?.map((eachUser) => {
					const {
						user_id,
						userName,
					} = eachUser || {};

					if (loading) {
						return (
							<Placeholder
								key={user_id}
								className={styles.placeholder_styles}
							/>
						);
					}

					return (
						<div key={user_id} className={styles.each_container}>
							<Checkbox onChange={() => handleCheckedChats({ eachUser, user_id })} />
							<div
								role="presentation"
								className={styles.card_container}
								onClick={() => {
									onCardClick({ item: eachUser });
								}}
							>
								<div className={styles.parent_flex}>
									<UserAvatar type="whatsapp" />
									<div className={styles.name}>{startCase(userName)}</div>
								</div>
								<IcMArrowNext className={styles.arrow_icon} />
							</div>
						</div>

					);
				}) : <div className={styles.no_data_found}>No Users Found</div>}
			</div>

			<div className={styles.send_action}>
				<Button
					size="md"
					themeType="accent"
					disabled={isEmpty(selectedUsers)}
					onClick={() => setModalType('bulk_communication')}
					type="button"
				>
					Choose Template
				</Button>
			</div>

		</div>
	);
}
export default OrgUsersList;
