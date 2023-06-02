import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function PersonalInformation({ profileData }) {
	const { detail } = profileData || {};

	const {
		name,
		gender,
		personal_email,
		mobile_country_code,
		mobile_number,
		permanent_address, present_address, cogoport_email, date_of_birth,
		date_of_joining, designation, emergency_contact_details,
		employee_code, hiring_manager, hiring_manager_email,
	} = detail || {};

	const { address = '', city = '', country = '', pincode = '', state = '' } = permanent_address || {};
	const permanentAddress = `${address}, ${city}, ${state}, ${country} - ${pincode}`;

	const presentAddress = `${present_address?.address || ''}, ${present_address?.city || ''}, 
	${present_address?.state || ''}, ${present_address?.country || ''} - ${present_address?.pincode || ''}`;

	const mobileNumber = `${mobile_country_code} ${mobile_number}`;
	const emergencyContactDetails = 	`${emergency_contact_details?.[0]?.mobile_country_code}
	${emergency_contact_details?.[0]?.mobile_number}`;

	const formatdate = ({ date }) => formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MM-yyyy'],
		formatType : 'date',
	});

	const MAPPING = {
		name                      : startCase(name),
		gender                    : startCase(gender),
		personal_email,
		Mobile_number             : mobileNumber,
		permanentAddress,
		presentAddress,
		cogoport_email,
		date_of_birth             : formatdate({ date: date_of_birth }),
		date_of_joining           : formatdate({ date: date_of_joining }),
		designation               : startCase(designation),
		employee_code,
		hiring_manager            : startCase(hiring_manager),
		hiring_manager_email,
		emergency_contact_details : emergencyContactDetails,
	};

	return (
		<div className={styles.container}>
			{
				((Object.keys(MAPPING)) || []).map((element) => (
					<div key={element} className={styles.flex_wrapper}>
						<div className={styles.label}>
							{startCase(element)}
							{' '}
						</div>

						<div>
							{' '}
							{MAPPING?.[element]
								|| detail?.[element]?.mobile_number || detail?.[element]?.mobile_country_code || '-'}
						</div>
					</div>
				))
			}

		</div>
	);
}

export default PersonalInformation;
