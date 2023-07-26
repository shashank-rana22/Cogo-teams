import { Placeholder, Checkbox, Button, cl, Select } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import UserAvatar from '../../../../common/UserAvatar';
import useListOrgUsers from '../../../../hooks/useListOrgUsers';

import SelecetdUsers from './selecetdUsers';
import styles from './styles.module.css';

const LOADER_COUNT = 4;

const USER_SELECT_PAGINATION = [
	{ label: 'Page Limit 100', value: 100 },
	{ label: 'Page Limit 150', value: 150 },
	{ label: 'Page Limit 200', value: 200 },
];

function OrgUsersList({
	setActiveTab = () => {},
	listServiceProviders = [],
	setListServiceProviders = () => {},
	setModalType = () => {},
	setSelectedUsers = () => {},
	selectedUsers = {},
	setSendBulkTemplates = () => {},
	modalType = '',
	selectedAutoAssign = {},
	setSelectedAutoAssign = () => {},
	setSelectAll = () => {},
	selectAll = false,
}) {
	const [pageLimit, setPageLimit] = useState(null);

	const {
		formattedOrgUsersList = [],
		loading = false,
		handleScroll = () => {},
		setListData,
	} = useListOrgUsers({ organizationId: listServiceProviders, pageLimit });

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
		setSendBulkTemplates(false);
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

	const handleSelectAll = ({ event }) => {
		setSelectAll(event.target.checked);
		if (event.target.checked) {
			setSelectedUsers(() => {
				const ALL_USER_DATA = {};
				modifiedList.forEach((user) => {
					ALL_USER_DATA[user.user_id] = user;
				});

				return ALL_USER_DATA;
			});
		} else {
			setSelectedUsers({});
		}
	};

	if (!isEmpty(selectedAutoAssign)) {
		return (
			<div className={cl`${styles.container} ${!modalType || !selectedAutoAssign ? styles.empty_list : ''}`}>
				<SelecetdUsers
					selectedAutoAssign={selectedAutoAssign}
					setSelectedAutoAssign={setSelectedAutoAssign}
				/>

				<div className={styles.send_action}>
					<Button
						size="md"
						themeType="accent"
						disabled={!selectedAutoAssign}
						onClick={() => setModalType('bulk_communication')}
						type="button"
					>
						Choose Template
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.port_pair_view}>
			<div className={styles.all_user_select}>
				<Checkbox
					checked={selectAll}
					disabled={isEmpty(modifiedList)}
					onChange={(event) => handleSelectAll({ event })}
				/>
				{' '}
				Select All
				<Select
					value={pageLimit}
					onChange={(val) => {
						setPageLimit(val);
						setListData({
							list  : [],
							total : 0,
						});
						setSelectAll(false);
						setSelectedUsers({});
					}}
					disabled={isEmpty(modifiedList)}
					size="sm"
					placeholder="Select Books"
					options={USER_SELECT_PAGINATION}
					className={styles.selector}

				/>
			</div>
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
								<Checkbox
									checked={Object.keys(selectedUsers || {}).includes(user_id)}
									onChange={() => handleCheckedChats({ eachUser, user_id })}
								/>
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
		</div>
	);
}
export default OrgUsersList;
