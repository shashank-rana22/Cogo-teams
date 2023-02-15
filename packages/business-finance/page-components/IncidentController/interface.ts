export type FilterProps = {
	page: number,
	pageLimit: number,
	search?: string,
	activeTab?: string,
	searchQuery?: string,
	category?:string,
	date?:{ startDate?:Date, endDate?:Date }
	urgency?:string
};
interface Date {
	startDate?:object
	endDate?:object
}

export interface TableProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	page?:number,
	pageSize?:number,
	total?:number
	setFilters?: React.Dispatch<React.SetStateAction<FilterProps>>
	filters?:FilterProps
	columns: object[];
	data: object[];
	loading?: boolean;
	layoutType?: 'table' | 'block' | 'flex' | 'absolute';
	selectType?: 'single' | 'multiple';
	onRowSelect?: (row: object) => void;
	onRowClick?: (row: object) => void;
	getRowId?: (row: object) => string;
}
interface StatsInterface {
	REQUESTED?:number
	APPROVED?:number
	REJECTED?:number
}
export interface IncidentDataInterface {
	activeTab?:string
	incidentData?:{ list?:Array<object>, statsData:StatsInterface,
		paginationData?:{ pageIndex?:number, pageSize?:number, total?:number } }
	setFilters?: React.Dispatch<React.SetStateAction<FilterProps>>
	filters?:FilterProps
	isSettlementExecutive?:boolean
	incidentLoading?:boolean
	getIncidentData?:()=>{ }
}

export interface MatchModalInterface {
	value?:{ date?:string }
	setValue: React.Dispatch<React.SetStateAction<{ date: string; }>>
	checkedData?:Array<object>
	incidentMappingId?:string
	settlementDate?:Date
	supportingDocUrl?:string
	id?:string
	type?:string
	refetch?:()=>{}
	isEditable?:boolean
}
