import { startCase } from '@cogoport/utils';

import { agentDetails } from '../configs/agentDetals';
import { documents } from '../configs/documents';
import { driverDetails } from '../configs/driverDetails';
import { fuelDetails } from '../configs/fuelDetails';
import { rejectedDocuments } from '../configs/rejectedDocuments';
import { truckDetails } from '../configs/truckDetails';
import { vendorDetails } from '../configs/vendorDetails';
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
		documents,
		truck_details  : truckDetails,
		driver_details : driverDetails,
		fuel_details   : fuelDetails,
	},
	[STEPPER_KEYS_OBJ.ONBOARDING_DOCUMENTS]: {
		vendor_details : vendorDetails,
		agent_details  : agentDetails,
	},
	[STEPPER_KEYS_OBJ.OTHER_DOCUMENTS]     : {},
	[STEPPER_KEYS_OBJ.DISCARDED_DOCUMENTS] : {
		discarded_documents: rejectedDocuments,
	},
};

export const ALL_STEPPER_CONFIGS_OBJ = {
	documents,
	truck_details       : truckDetails,
	driver_details      : driverDetails,
	fuel_details        : fuelDetails,
	vendor_details      : vendorDetails,
	agent_details       : agentDetails,
	discarded_documents : rejectedDocuments,
};
