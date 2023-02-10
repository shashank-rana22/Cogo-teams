export type FilterProps = {
	page: number,
	pageLimit: number,
	search?: string,
	activeTab?: string,
	searchQuery?: string,
	category?:string
	date?:Date
};
interface Date {
	startDate?:object
	endDate?:object
}

export interface Tab {
	activeTab: string
}

export interface TableProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	columns: object[];
	data: object[];
	loading?: boolean;
	layoutType?: 'table' | 'block' | 'flex' | 'absolute';
	selectType?: 'single' | 'multiple';
	onRowSelect?: (row: object) => void;
	onRowClick?: (row: object) => void;
	getRowId?: (row: object) => string;
}
export interface IncidentDataInterface {
	incidentData?:{ list?:Array<object> }
	setFilters?: React.Dispatch<React.SetStateAction<FilterProps>>
	filters?:FilterProps
	isSettlementExecutive?:boolean
	incidentLoading?:boolean
	getIncidentData?:()=>{ }
}
