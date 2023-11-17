import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import { EMPLOYEE_LEVEL, MY_TEAM_LEVEL } from '../constants';

const PAGE_DECREMENT = 1;
export const getPayload = ({
	performerId, pageIndex, agent, searchQuery, category, spectatorType, startDate, endDate, sortType = '',
	sortOrder = '', idType = '', serialId = '', filterCategory = '', subcategory = '', raisedBy = '',
	raisedTo = '', service = '', trade = '', requestType = '', adminSpectator = '',
}) => ({
	PerformedByID : performerId,
	size          : 10,
	page          : pageIndex - PAGE_DECREMENT,
	AgentID       : agent || undefined,
	QFilter       : searchQuery || undefined,
	Type          : category || undefined,
	SpectatorType : agent ? adminSpectator : spectatorType || undefined,
	SortBy        : sortType || undefined,
	SortType      : sortOrder || undefined,
	StartDate     : formatDate({
		date       : startDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'date',
	}) || undefined,
	EndDate: formatDate({
		date       : endDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'date',
	}) || undefined,
	SerialID      : serialId || undefined,
	IDType        : idType || undefined,
	EmployeeLevel : MY_TEAM_LEVEL?.includes(spectatorType) ? EMPLOYEE_LEVEL : undefined,
	Category      : filterCategory || undefined,
	Subcategory   : subcategory || undefined,
	RaisedByDesk  : raisedBy || undefined,
	RaisedToDesk  : raisedTo || undefined,
	Service       : service || undefined,
	TradeType     : trade || undefined,
	RequestType   : requestType || undefined,
});
