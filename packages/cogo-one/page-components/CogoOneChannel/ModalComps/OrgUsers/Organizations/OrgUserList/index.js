import { Placeholder, Input } from '@cogoport/components';
import { IcMSearchdark, IcMArrowNext, IcMArrowBack } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import UserAvatar from '../../../../../../common/UserAvatar';
import useListOrganizationUsers from '../../../../../../hooks/useListOrganizationUsers';

import styles from './styles.module.css';

const LOADER_COUNT = 4;

function OrgUsersList({
	orgDetail = {},
	setActiveTab = () => {},
	setOpenKamContacts = () => {},
	endPoint = '',
	filterKey = '',
	activeOrg = '',
	setShowUser = () => {},
}) {
	const { id = '', name = '' } = orgDetail;

	const {
		formattedOrgUsersList = [],
		loading = false,
		setSearch = () => {},
		search = '',
	} = useListOrganizationUsers({ organizationId: id, endPoint, filterKey });

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

		setOpenKamContacts(false);
	};

	const modifiedList = loading ? [...Array(LOADER_COUNT).fill({})] : formattedOrgUsersList;

	return (
		<div className={styles.container}>
			<div className={styles.header_section}>
				<div className={styles.top_section}>
					<IcMArrowBack className={styles.back_icon} onClick={() => setShowUser(false)} />
					<div className={styles.org_name}>{startCase(name)}</div>
				</div>
				{activeOrg === 'organization' ? (
					<div className={styles.input_container}>
						<Input
							placeholder="search by name..."
							onChange={setSearch}
							value={search}
							className={styles.input_styles}
							size="sm"
							prefix={<IcMSearchdark />}
						/>
					</div>
				) : null}
			</div>

			<div className={styles.list_container}>
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
						<div
							key={user_id}
							role="presentation"
							className={styles.each_container}
							onClick={() => {
								onCardClick({
									item: eachUser,
								});
							}}
						>
							<div className={styles.parent_flex}>
								<UserAvatar type="whatsapp" />
								<div className={styles.name}>{startCase(userName)}</div>
							</div>
							<IcMArrowNext className={styles.arrow_icon} />
						</div>
					);
				}) : <div className={styles.no_data_found}>No Users Found</div>}
			</div>
		</div>
	);
}
export default OrgUsersList;
