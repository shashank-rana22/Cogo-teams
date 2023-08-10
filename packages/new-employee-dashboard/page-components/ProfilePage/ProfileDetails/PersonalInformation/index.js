import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

import CommonLoader from '../../../../common/Loader';

import styles from './styles.module.css';

const EMERGENCY_CONTACT_NUMBER_INDEX = 0;

const formatdate = ({ date }) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MM-yyyy'],
	formatType : 'date',
});

function PersonalInformation({ profileData, getEmployeeDetailsLoading }) {
	const { detail } = profileData || {};

	const {
		name,
		gender,
		personal_email,
		mobile_country_code,
		mobile_number,
		permanent_address, present_address, cogoport_email, date_of_birth,
		date_of_joining, designation, emergency_contact_details,
		employee_code, hiring_manager, hr, hrbp, office_location,
	} = detail || {};

	const { address = '', city = '', country = '', pincode = '', state = '' } = permanent_address || {};
	const permanentAddress = !isEmpty(permanent_address)
		? `${address}, ${city}, ${state}, ${country} - ${pincode}` : '-';

	const presentAddress = !isEmpty(present_address)
		? `${present_address?.address || ''}, ${present_address?.city || ''}, 
	${present_address?.state || ''}, ${present_address?.country || ''} - ${present_address?.pincode || ''}` : '-';

	const mobileNumber = `${mobile_country_code} ${mobile_number}`;

	const emergencyContactDetails = !isEmpty(emergency_contact_details)
		? `${emergency_contact_details?.[EMERGENCY_CONTACT_NUMBER_INDEX]?.mobile_country_code}
	${emergency_contact_details?.[EMERGENCY_CONTACT_NUMBER_INDEX]?.mobile_number}` : '-';

	const MAPPING = {
		name                      : startCase(name),
		gender                    : startCase(gender) || '-',
		personal_email,
		Mobile_number             : mobileNumber,
		permanentAddress,
		presentAddress,
		cogoport_email,
		date_of_birth             : formatdate({ date: date_of_birth }),
		date_of_joining           : formatdate({ date: date_of_joining }),
		designation               : startCase(designation),
		employee_code,
		office_location,
		hiring_manager            : startCase(hiring_manager?.userName),
		hiring_manager_email      : hiring_manager?.userEmail,
		emergency_contact_details : emergencyContactDetails,
		HR_name                   : startCase(hr?.userName),
		HR_email                  : hr?.userEmail,
		HRBP_name                 : startCase(hrbp?.userName),
		HRBP_email                : hrbp?.userEmail,
	};

	if (getEmployeeDetailsLoading) return <CommonLoader />;

	return (
		<div className={styles.container}>
			{((Object.keys(MAPPING)) || []).map((element) => (
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
			))}
		</div>
	);
}

export default PersonalInformation;
