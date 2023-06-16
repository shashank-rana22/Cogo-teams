import {
	IcMFcl,
	IcMLcl,
	IcMCustoms,
	IcMHaulage,
	IcMTrailorFull,
	IcMLtl,
	IcMAir,
	IcMCfs,
	IcMFtl,
} from '@cogoport/icons-react';

export const SERVICE_TYPE_MAPPING = {
	fcl_freight_service: {
		icon  : <IcMFcl width="25px" height="20px" color="#034afd" />,
		label : 'FCL',
	},
	lcl_freight_service: {
		icon  : <IcMLcl width="25px" height="20px" color="#89cad1" />,
		label : 'LCL',
	},
	air_freight_service: {
		icon  : <IcMAir width="25px" height="20px" color="#ee3425" />,
		label : 'AIR',
	},
	air_customs_service: {
		icon:
	<IcMCustoms width="25px" height="20px" color="#ee3425" />,
		label: 'AIR CUSTOMS',
	},
	fcl_customs_service: {
		icon:
	<IcMCustoms width="25px" height="20px" color="#034afd" />,
		label: 'FCL CUSTOMS',
	},
	lcl_customs_service: {
		icon:
	<IcMCustoms width="25px" height="20px" color="#89cad1" />,
		label: 'LCL CUSTOMS',
	},
	haulage_freight_service: {
		icon:
	<IcMHaulage width="25px" height="20px" color="#898fd1" />,
		label: 'HAULAGE',
	},
	trailer_freight_service: {
		icon:
	<IcMTrailorFull width="25px" height="20px" color="#898fd1" />,
		label: 'TRAILER',
	},
	ftl_freight_service : { icon: <IcMFtl width="25px" height="20px" color="#898fd1" />, label: 'FTL' },
	ltl_freight_service : { icon: <IcMLtl width="25px" height="20px" color="#898fd1" />, label: 'LTL' },
	fcl_cfs_service     : { icon: <IcMCfs width="25px" height="20px" color="#034afd" />, label: 'FCL CFS' },
};

export const SINGLE_LOCATIONS = [
	'fcl_customs_service',
	'lcl_customs_service',
	'air_customs_service',
	'fcl_cfs_service',
];

export const SERVICES_WITH_DETAILS = [
	'fcl_freight_service',
	'lcl_freight_service',
	'air_freight_service',
];

export const DETENTION_INFO_KEY_MAPPING = {
	air_freight : { label: 'Destination Detention Storage Free Hours', key: 'destination_storage_free_days' },
	lcl_freight : { label: 'Destination Detention Storage Free Days', key: 'destination_storage_free_days' },
	default     : { label: 'Destination Detention Free Days', key: 'free_days_detention_destination' },
};

export const SERVICE_LABEL_MAPPING = [
	'airline',
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'trucks_count',
	'trade_type',
	'packages',
	'volume',
	'weight',
	'master_airway_bill_number',
	'house_airway_bill_number',
	'haulage_type',
	'transport_mode',
	'cargo_weight_per_container',
	'destination_cargo_handling_type',
	'truck_type',
	'trip_type',
	'lr_number',
	'commodity_description',
];

export const UNITS_MAPPING = {
	fcl_freight_service     : '/Cont',
	fcl_customs_service     : '/Cont',
	fcl_cfs_service         : '/Cont',
	air_freight_service     : '/Kg',
	air_customs_service     : '/Kg',
	lcl_freight_service     : '/CBM',
	lcl_customs_service     : '/CBM',
	haulage_freight_service : '/Cont',
	trailer_freigth_service : '/Truck',
	ltl_freight_service     : '/Truck',
	ftl_freight_service     : '/Truck',
};

export const STATUS_PENDING = ['not_reverted', 'awaiting_response'];
export const ORG_RESPONDED = ['booking_won', 'booking_lost', 'awaiting_confirmation'];

export const REVERT_STATUS_LABEL_MAPPING = {
	booking_won           : 'Booking Won',
	booking_lost          : 'Booking Lost',
	not_reverted          : 'Not Reverted',
	awaiting_confirmation : 'Awaiting Response',
};

export const REVERTABLE_SERVICES = ['fcl_freight_service', 'lcl_freight_service'];
