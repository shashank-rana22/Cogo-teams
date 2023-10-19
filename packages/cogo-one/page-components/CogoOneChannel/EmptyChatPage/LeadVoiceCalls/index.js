import { Input, Pagination, Button } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight, IcMCross } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useListLeadOrgUsers from '../../../../hooks/useListLeadOrgUsers';

import CreateLeadAccount from './CreateLeadAccount';
import LeadOrgCard from './LeadOrgCard';
import styles from './styles.module.css';

function LeadVoiceCalls({ setActiveTab = () => {} }) {
	const dispatch = useDispatch();
	const [createLeadModal, setCreateLeadModal] = useState(false);

	const {
		data,
		loading,
		search,
		setSearch,
		handlePagination,
		partnerId,
		getOrganizationUsers = () => {},
	} = useListLeadOrgUsers();

	const geo = getGeoConstants();

	const { list = [], page = 1, page_limit = 6, total_count = 0 } = data || {};

	const openLeadOrgModal = ({ type = '', leadOrgId = '', leadUserId = '' }) => {
		dispatch(
			setProfileState({
				lead_feedback_form_data: {
					lead_organization_id : leadOrgId,
					lead_user_id         : leadUserId,
					source               : 'cogo_one',
				},
				lead_feedback_form_type: type,
			}),
		);
	};

	const hasVoiceCallAccess = geo.others.navigations.cogo_one.has_voice_call_access;

	const handlePlaceCall = ({ number, code, userName, leadOrgId = '', leadUserId }) => {
		if (!hasVoiceCallAccess || !number) {
			return;
		}

		dispatch(
			setProfileState({
				is_in_voice_call          : true,
				voice_call_recipient_data : {
					orgId                : null,
					userId               : null,
					mobile_number        : number,
					mobile_country_code  : code,
					userName,
					isUnkownUser         : true,
					lead_user_id         : leadUserId,
					lead_organization_id : leadOrgId,
				},
			}),
		);
	};

	const handleOpenMessage = ({ selectedLeadUser }) => {
		const {
			name,
			email,
			whatsapp_country_code,
			whatsapp_number,
			mobile_number,
			mobile_country_code,
			lead_user_id,
			lead_organization_id,
		} = selectedLeadUser || {};

		let numberEformat;

		if (whatsapp_country_code) {
			numberEformat = `${whatsapp_country_code?.replace('+', '') || ''}${whatsapp_number || ''}`;
		} else if (mobile_country_code) {
			numberEformat = `${mobile_country_code?.replace('+', '') || ''}${mobile_number || ''}`;
		}

		const chatData = {
			user_id                 : null,
			lead_user_id,
			lead_organization_id,
			user_name               : name,
			whatsapp_number_eformat : whatsapp_number || mobile_number,
			email,
			channel_type            : 'whatsapp',
			countryCode             : whatsapp_country_code || mobile_country_code,
			mobile_no               : numberEformat,
		};

		setActiveTab((prev) => ({
			...prev,
			hasNoFireBaseRoom : true,
			data              : chatData,
			tab               : 'message',
		}));
	};

	const redirectToLeads = ({ e, leadOrgId }) => {
		e.stopPropagation();
		const leadOrgPage = `${window.location.origin}/${partnerId}/lead-organization/${leadOrgId}`;
		window.open(leadOrgPage, '_blank');
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.title}>Lead Contacts</div>
				<div className={styles.filter_section}>
					<Button
						size="md"
						themeType="accent"
						className={styles.add_button}
						onClick={() => setCreateLeadModal(true)}
					>
						Create Account
					</Button>
					<Input
						size="sm"
						value={search}
						onChange={setSearch}
						prefix={<IcMSearchlight className={styles.search_icon} />}
						placeholder="Search By Name"
						className={styles.input_styled}
						suffix={search ? (
							<IcMCross
								className={styles.cross_icon}
								onClick={() => setSearch('')}
							/>
						) : null}
					/>
				</div>
			</div>
			{loading ? (
				<div className={styles.loader}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.cogo_one_loader}
						alt="load"
						width={160}
						height={160}
					/>
				</div>
			) : (
				<div className={styles.list_container}>
					{!isEmpty(list)
						? list?.map((eachItem) => (
							<LeadOrgCard
								key={eachItem?.id}
								eachItem={eachItem}
								setActiveTab={setActiveTab}
								openLeadOrgModal={openLeadOrgModal}
								handlePlaceCall={handlePlaceCall}
								handleOpenMessage={handleOpenMessage}
								redirectToLeads={redirectToLeads}
							/>
						)) : (
							<div className={styles.loader}>
								<Image
									src={GLOBAL_CONSTANTS.image_url.empty_state}
									alt="empty"
									width={250}
									height={200}
								/>
							</div>
						)}
				</div>
			)}
			<div className={styles.pagination_container}>
				{!loading ? (
					<Pagination
						type="number"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={handlePagination}
					/>
				) : null}
			</div>

			{createLeadModal ? (
				<CreateLeadAccount
					createLeadModal={createLeadModal}
					setCreateLeadModal={setCreateLeadModal}
					getOrganizationUsers={getOrganizationUsers}
				/>
			) : null}

		</div>
	);
}
export default LeadVoiceCalls;
