import React from 'react';

import { FilterProps } from '../common/interface';

export interface TooltipInterface {
	div?:string
	tradePartyName?:string
}

export interface ColumnInterface {
	activeTab?:string
	isAscendingActive?:boolean
	setFilters: React.Dispatch<React.SetStateAction<FilterProps>>
	setIsAscendingActive:React.Dispatch<React.SetStateAction<boolean>>
	getIncidentData?:()=>{}
}
