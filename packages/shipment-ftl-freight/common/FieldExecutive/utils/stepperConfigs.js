import { startCase } from '@cogoport/utils';

import { AGENT_DETAILS } from '../configs/agentDetals';
import { DOCUMENTS } from '../configs/documents';
import { DRIVER_DETAILS } from '../configs/driverDetails';
import { FUEL_DETAILS } from '../configs/fuelDetails';
import { REJECTED_DOCUMENTS } from '../configs/rejectedDocuments';
import { TRUCK_DETAILS } from '../configs/truckDetails';
import { VENDOR_DETAILS } from '../configs/vendorDetails';
// import { otherDetails } from '../configs/otherDetails';

/*
Configs files containes the following keys in single objects :

@ label  -> This signifies the title to be shown on UI,
@ key  -> This is unique identifying factor of each array object,
@ dataMainAccess  -> This is used to access child data object from parent data if child data object exist,
@ dataSubAccess -> This is used to access child object of child data object,
@ dataAccessKey  -> This is used to to access final value from data,
@ customType  -> This is used to define the field of data type it stored , e.g. document , input

*/

const INIT_VALUE = 1;

export const STEPPER_KEYS_OBJ = {
	TRIP_DOCUMENTS       : 'trip_documents',
	ONBOARDING_DOCUMENTS : 'onboarding_documents',
	OTHER_DOCUMENTS      : 'other_documents',
	DISCARDED_DOCUMENTS  : 'discarded_documents',
};

export const STEPPER_ARRAY = Object.values(STEPPER_KEYS_OBJ).map(
	(item, index) => ({
		serial_id : index + INIT_VALUE,
		title     : startCase(item),
		key       : item,
	}),
);

export const STEPPER_OBJ = {
	[STEPPER_KEYS_OBJ.TRIP_DOCUMENTS]: {
		DOCUMENTS,
		truck_details  : TRUCK_DETAILS,
		driver_details : DRIVER_DETAILS,
		fuel_details   : FUEL_DETAILS,
	},
	[STEPPER_KEYS_OBJ.ONBOARDING_DOCUMENTS]: {
		vendor_details : VENDOR_DETAILS,
		agent_details  : AGENT_DETAILS,
	},
	[STEPPER_KEYS_OBJ.OTHER_DOCUMENTS]     : {},
	[STEPPER_KEYS_OBJ.DISCARDED_DOCUMENTS] : {
		discarded_documents: REJECTED_DOCUMENTS,
	},
};

export const ALL_STEPPER_CONFIGS_OBJ = {
	DOCUMENTS,
	truck_details       : TRUCK_DETAILS,
	driver_details      : DRIVER_DETAILS,
	fuel_details        : FUEL_DETAILS,
	vendor_details      : VENDOR_DETAILS,
	agent_details       : AGENT_DETAILS,
	discarded_documents : REJECTED_DOCUMENTS,
};
