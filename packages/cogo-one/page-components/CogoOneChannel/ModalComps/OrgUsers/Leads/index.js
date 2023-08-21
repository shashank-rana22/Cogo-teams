import { Placeholder, Input } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMAppSearch } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import UserCard from '../../../../../common/UserCard';
import useListLeadOrganizationUsers from '../../../../../hooks/useListLeadOrganizationUsers';

import styles from './styles.module.css';

const REMOVE_PLUS_SIGN = 1;

const LOADER_COUNT = 4;

function Leads({
	setActiveTab = () => {},
	setOpenKamContacts = () => {},
}) {
	const geo = getGeoConstants();

	const {
		listData = {},
		loading = false,
		handleScroll = () => {},
		search,
		setSearch = () => {},
		setListData = () => {},
	} = useListLeadOrganizationUsers();

	const onCardClick = ({ item }) => {
		const {
			lead_user_id,
			email,
			mobile_country_code = '',
			mobile_number = '',
			whatsapp_country_code = '',
			whatsapp_number = '',
			name,
			lead_organization_id,
		} = item || {};

		const countryCode = whatsapp_country_code || mobile_country_code || geo.country.mobile_country_code;
		const mobileNumber = `${countryCode?.slice(REMOVE_PLUS_SIGN) || ''}${whatsapp_number || mobile_number || ''}`;

		setActiveTab((prev) => ({
			...prev,
			hasNoFireBaseRoom : true,
			data              : {
				lead_organization_id,
				lead_user_id,
				user_name               : name,
				whatsapp_number_eformat : whatsapp_number || mobile_number,
				email,
				channel_type            : 'whatsapp',
				countryCode,
				mobile_no               : mobileNumber,
			},
			tab: 'message',
		}));

		setOpenKamContacts(false);
		setListData((prev) => ({ ...prev, list: [], isLastPage: false }));
	};

	const modifiedList = listData?.list;

	return (
		<div className={styles.container}>
			<div className={styles.input_container}>
				<Input
					placeholder="search by name..."
					onChange={setSearch}
					value={search}
					className={styles.input_styles}
					size="md"
					suffix={<IcMAppSearch className={styles.search_icon} />}
				/>
			</div>

			{isEmpty(modifiedList) && !loading ? (
				<div className={styles.no_data_found}>No Users Found</div>
			) : null}

			<div className={styles.list_container} onScroll={handleScroll}>
				{modifiedList?.map((eachUser) => {
					const {
						id = '',
						name = '',
						email = '',
						mobile_number = '',
						mobile_country_code = '',
						whatsapp_country_code = '',
						whatsapp_number = '',
					} = eachUser || {};

					const userData = {
						name,
						email,
						country_code  : whatsapp_country_code || mobile_country_code,
						user_number   : whatsapp_number || mobile_number,
						business_name : '',
					};

					return (
						<div
							key={id}
							role="presentation"
							className={styles.each_container}
							onClick={() => {
								onCardClick({
									item: eachUser,
								});
							}}
						>
							<UserCard userData={userData} showDirection />
						</div>
					);
				}) }

				{loading ? (
					[...Array(LOADER_COUNT).keys()].map((key) => (
						<Placeholder width="100%" height="40px" key={key} margin="6px 0" className={styles.skeleton} />
					))
				) : null}

			</div>
		</div>
	);
}
export default Leads;
