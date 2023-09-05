const STAKEHOLDER_MAPPING = {
	supply_agent                  : 'Supply Owner',
	booking_agent                 : 'CCS',
	service_ops1                  : 'Booking Desk',
	service_ops2                  : 'Document Desk',
	service_ops3                  : 'Service Ops 3',
	sales_agent                   : 'Sales Agent',
	entity_manager                : 'Entity Manager',
	portfolio_manager             : 'Portfolio Manager',
	lastmile_ops                  : 'Last Mile Ops',
	credit_controller             : 'Credit Controller',
	release_desk                  : 'Release Desk',
	collection_desk               : 'Collection Desk',
	bl_collection_desk            : 'BL Collection Desk',
	do_collection_desk            : 'DO Collection Desk',
	bl_release_desk               : 'BL Release Desk',
	do_release_desk               : 'DO Release Desk',
	costbooking_ops               : 'Cost Booking Ops',
	origin_booking_agent          : 'Origin KAM',
	destination_booking_agent     : 'Destination KAM',
	origin_credit_controller      : 'Origin Credit Controller',
	destination_credit_controller : 'Destination Credit Controller',
};

export const DEFAULT_STAKEHOLDERS = {
	booking_agent             : 'CCS',
	sales_agent               : 'Sales Agent',
	entity_manager            : 'Entity Manager',
	origin_booking_agent      : 'Origin KAM',
	destination_booking_agent : 'Destination KAM',
};

export const STAKEHOLDER_CAN_BE_ADDED = {
	supply_agent              : 'Supply Owner',
	booking_agent             : 'CCS',
	service_ops1              : 'Booking Desk',
	service_ops2              : 'Document Desk',
	service_ops3              : 'Service Ops 3',
	sales_agent               : 'Sales Agent',
	entity_manager            : 'Entity Manager',
	portfolio_manager         : 'Portfolio Manager',
	lastmile_ops              : 'Last Mile Ops',
	costbooking_ops           : 'Cost Booking Ops',
	origin_booking_agent      : 'Origin KAM',
	destination_booking_agent : 'Destination KAM',
};

export const SERVICE_LEVEL_STATKEHOLDERS = [
	'supply_agent', 'service_ops1', 'service_ops2', 'service_ops3',
];

export default STAKEHOLDER_MAPPING;
