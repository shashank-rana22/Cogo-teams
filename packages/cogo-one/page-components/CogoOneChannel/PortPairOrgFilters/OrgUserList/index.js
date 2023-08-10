import { Placeholder, Checkbox, Button, cl, Select } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import UserAvatar from '../../../../common/UserAvatar';
import useListOrgUsers from '../../../../hooks/useListOrgUsers';

import SelecetdUsers from './selecetdUsers';
import styles from './styles.module.css';

const LOADER_COUNT = 4;
const PAGE_LIMIT = 10;

const USER_SELECT_PAGINATION = [
	{ label: '10', value: 10 },
	{ label: '100', value: 100 },
	{ label: '150', value: 150 },
	{ label: '200', value: 200 },
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
	const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);

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
			tab: 'message',
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

	const userList = Object.values(
		formattedOrgUsersList.reduce((acc, obj) => {
			acc[obj.user_id] = obj;
			return acc;
		}, {}),
	);

	const finalList = loading ? [...Array(LOADER_COUNT).keys()] : userList;

	const handleSelectAll = ({ event }) => {
		setSelectAll(event.target.checked);
		if (event.target.checked) {
			setSelectedUsers(() => {
				const ALL_USER_DATA = {};
				finalList.forEach((user) => {
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
					disabled={isEmpty(finalList)}
					onChange={(event) => handleSelectAll({ event })}
				/>
				Select All
				<div className={styles.page_limit_selection}>
					Page Limit
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
						disabled={isEmpty(finalList)}
						size="sm"
						options={USER_SELECT_PAGINATION}
						className={styles.selector}
					/>
				</div>

			</div>
			<div className={cl`${styles.container} ${!modalType || isEmpty(finalList) ? styles.empty_list : ''}`}>
				<div className={styles.list_container} onScroll={handleScroll}>
					{!isEmpty(finalList) ? (finalList || []).map((eachUser) => {
						const {
							user_id,
							userName,
						} = eachUser || {};

						if (loading) {
							return (
								<Placeholder
									key={eachUser}
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
									<div className={styles.all_user_select}>
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
