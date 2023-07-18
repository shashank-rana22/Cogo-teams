import { Placeholder, Input } from '@cogoport/components';
import { IcMSearchdark, IcMArrowNext } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import UserAvatar from '../../../../common/UserAvatar';
import useListOrganizationUsers from '../../../../hooks/useListOrganizationUsers';

import styles from './styles.module.css';

const LOADER_COUNT = 4;

function OrgUsersList({
	orgId = '',
	setActiveTab = () => {},
	setOpenKamContacts = () => {},
	setOrgId = () => {},
}) {
	const {
		formattedOrgUsersList = [],
		loading = false,
		setSearch = () => {},
		search = '',
	} = useListOrganizationUsers({ organizationId: orgId });

	const onCardClick = ({ data }) => {
		setActiveTab((p) => ({
			...p,
			hasNoFireBaseRoom : true,
			data,
			activeTab         : 'message',
		}));
		setOpenKamContacts(false);
		setOrgId('');
	};

	const modifiedList = loading ? [...Array(LOADER_COUNT).fill({})] : formattedOrgUsersList;

	if (!orgId) {
		return (
			<div className={styles.select_org_text}>
				Select a Organizaton
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.input_container}>
				<Input
					placeholder="search by name..."
					onChange={(e) => setSearch(e)}
					value={search}
					className={styles.input_styles}
					size="sm"
					prefix={<IcMSearchdark />}
				/>
			</div>
			<div className={styles.list_container}>
				{!isEmpty(modifiedList) ? modifiedList?.map((eachUser) => {
					const {
						organization_id,
						user_id,
						userName,
						whatsapp_number_eformat,
						email,
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
									data: {
										organization_id,
										user_id,
										userName,
										mobile_no    : whatsapp_number_eformat,
										email,
										channel_type : 'whatsapp',
									},
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
