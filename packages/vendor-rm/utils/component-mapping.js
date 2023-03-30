import ContactDetails from '../page-components/OnBoardVendor/ContactDetails';
import PaymentDetails from '../page-components/OnBoardVendor/PaymentDetails';
import VendorDetails from '../page-components/OnBoardVendor/VendorDetails';
import VendorServices from '../page-components/OnBoardVendor/VendorServices';
import VerificationDetails from '../page-components/OnBoardVendor/VerificationDetails';

const COMPONENT_MAPPING = [
	{
		key       : 'vendor_details',
		component : VendorDetails,
		step      : 1,
	},
	{
		key       : 'contact_details',
		component : ContactDetails,
		step      : 2,
	},
	{
		key       : 'vendor_services',
		component : VendorServices,
		step      : 3,
	},
	{
		key       : 'payment_details',
		component : PaymentDetails,
		step      : 4,
	},
	{
		key       : 'verification',
		component : VerificationDetails,
		step      : 5,
	},
];

export default COMPONENT_MAPPING;
