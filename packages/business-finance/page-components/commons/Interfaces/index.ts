import React, { ReactNode } from 'react';

export interface ConfigType {
	showHeader?: boolean;
	headerStyles?: React.CSSProperties;
	itemStyles?: React.CSSProperties;
	bodyStyles?: React.CSSProperties;
	clickable?: boolean;
	showHeaderCheckbox?: boolean;
	fields: FieldType[];
}

export interface FunctionObjects {
	[key: string]: React.FC;
}

export interface GenericObject {
	[key: string]: any;
}

export interface NestedObj {
	[key: string]: string;
}

export interface SortingType {
	name: string;
}

export interface FieldType {
	key?: string;
	topKey?: GenericObject;
	bottomKey?: GenericObject;
	label?: string | ReactNode;
	sorting?: SortingType;
	span: number;
	className?: string;
	styles?: NestedObj;
	func?: string;
}

export interface TableProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	columns: object[];
	loading: boolean;
	data: object[];
	layoutType?: 'table' | 'block' | 'flex' | 'absolute';
	selectType?: 'single' | 'multiple';
	onRowSelect?: (row: object) => void;
	onRowClick?: (row: object) => void;
	getRowId?: (row: object) => string;
	imageFind:string;
}

export interface ListDataProps {
	list: object[];
	pageIndex?: number;
	totalPage?: number;
	totalRecords?: number;
}

export interface Options {
	label: string;
	value: string;
	name?:string;
}

export interface ControlProps {
	span?: number,
	name?: string,
	type?: string;
	options?: Options[];
	groupBy?:ControlProps[];
	style?:React.CSSProperties;
	[key:string]: string | number | undefined | boolean | Options[] | object[] | React.CSSProperties | Date;
}

interface PortInterface {
	display_name?:string
	postal_code?:string,
	country:{ name:string },
	name?:string
	port_code:string
}

interface IEInterface {
	business_name:string
}
interface PickupDropInt {
	postal_code?:string,
	country:{ name:string },
	display_name:string,
	name?:string
}
interface PortDetailsInt {
	port_code?:string | number,
	country?:{ name?:string },
	display_name?:string,
	name?:string
}

export interface DetailInterface {
	service_type?:string,
	origin_main_port?:string,
	destination_main_port?:string
	services?:Array<string>,
	chargable_weight?: number | string,
	weight: number,
	volume: number,
	lr_number:number | string,
	eway_bill_number: number | string,
	container_size: Array<string>,
	containers_count: number,
	packages_count: number,
	trucks_count:number,
	truck_type?: string,
	container_type?:string,
	trade_type?:string,
	commodity?:string,
	payment_term?:string,
	inco_term?: string,
	master_airway_bill_number?:string,
	house_airway_bill_number?:string,
	haulage_type?:string,
	airline?:{ business_name:string },
	transport_mode?:string,
	cargo_weight_per_container?:string | number,
	destination_cargo_handling_type?:string,
	origin_cargo_handling_type?:string,
	container_status?:string,
	source?:string,
	shipping_line?:{ business_name:string },
	preferred_shipping_line?:{ business_name:string },
	state?:string,
	origin_location?:PortInterface,
	container_handover_location?:PortInterface,
	container_pickup_location?:PortInterface,
	destination_location?:PortInterface,
	schedule_departure?:any,
	selected_schedule_departure:any,
	schedule_arrival:any,
	selected_schedule_arrival:any,
	bn_expiry:any,
	booking_note_deadline:any,
	si_cutoff:any,
	vgm_cutoff:any,
	gate_in_cutoff:any,
	document_cutoff:any,
	tr_cutoff:any,
	iip_certificates:object[] | string[],
	msds_certificates:object[] | string[],
	bl_category:string,
	bl_type:string,
	cargo_readiness_date:any,
	supplier_poc:object,
	origin_oversea_agent:object,
	shipper_details:object,
	buy_quotation_agreed_rates:number,
	hs_code?:{ hs_code: number | string, name: string },
	importer_exporter:IEInterface,
	shipment_type:string,
	pickup:PickupDropInt,
	drop:PickupDropInt,
	origin_port?: PortDetailsInt,
	originmainport?: PortDetailsInt,
	destination_port?: PortDetailsInt,
	destinationmainport?: PortDetailsInt
}
export interface RemarksValInterface {
	collectionPartyRemark?:string,
	billingPartyRemark?:string,
	invoiceDetailsRemark?:string,
	overallRemark?: string
	taggingRemark?:string
}
