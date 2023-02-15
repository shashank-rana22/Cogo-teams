/* eslint-disable import/no-cycle */

import ContactDetails from '../page-components/OnBoardVendor/ContactDetails';
import PaymentDetails from '../page-components/OnBoardVendor/PaymentDetails';
import VendorDetails from '../page-components/OnBoardVendor/VendorDetails';
import VendorServices from '../page-components/OnBoardVendor/VendorServices';
import VerificationDetails from '../page-components/OnBoardVendor/VerificationDetails';

const TABS_MAPPING = [
	{
		title     : 'Vendor Details',
		key       : 'vendor_details',
		step      : 1,
		component : VendorDetails,
	},
	{
		title     : 'Contact Details',
		key       : 'contact_details',
		step      : 2,
		component : ContactDetails,
	},
	{
		title     : 'Vendor Services',
		key       : 'vendor_services',
		step      : 3,
		component : VendorServices,
	},
	{
		title     : 'Payment Details',
		key       : 'payment_details',
		step      : 4,
		component : PaymentDetails,
	},
	{
		title     : 'Verification',
		key       : 'verification',
		step      : 5,
		component : VerificationDetails,
	},
];

export default TABS_MAPPING;
