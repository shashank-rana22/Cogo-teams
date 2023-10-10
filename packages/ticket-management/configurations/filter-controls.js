import {
	asyncFieldsOrganizations,
	asyncFieldsOrganizationUser,
	asyncTicketsCategory,
	asyncFieldsTicketTypes,
	asyncListShipments,
} from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import useGetAsyncTicketOptions from '@cogoport/forms/hooks/useGetAsyncTicketOptions';
import { useSelector } from '@cogoport/store';

import { ASYNC_LIST_API } from '../constants';

import getCreateControls from './create-controls';

const useRaiseTicketcontrols = ({
	watchOrgId = '', watchUserId = '', watchService = '', watchTradeType = '', watchCategory = '',
	watchRequestType = '', resetField = () => {}, setAdditionalInfo = () => {}, setValue = () => {},
	formattedSubCategories = [], setSubCategories = () => {}, watchSubCategory = '',
	t = () => {}, setRaiseToDesk = () => {}, formatRaiseToDeskOptions = [],
	watchRaisedByDesk = '', watchRaisedToDesk = '', setDefaultTypeId = () => {},
	watchServiceType = '', watchIdType = '',
}) => {
	const { rolesArr } = useSelector(({ profile }) => ({ rolesArr: profile?.auth_role_data?.role_functions || [] }));

	const isOperation = rolesArr.includes('operations');

	const checkSid = watchIdType === 'sid' ? ASYNC_LIST_API?.sid?.() : ASYNC_LIST_API[watchServiceType]?.();

	const organizationOptions = useGetAsyncOptions({ ...asyncFieldsOrganizations() });
	const categoryDeskOptions = useGetAsyncTicketOptions({
		...asyncTicketsCategory(),
		params: {
			Service          : watchServiceType || watchService || undefined,
			TradeType        : watchTradeType || undefined,
			RequestType      : watchRequestType || undefined,
			CategoryDeskType : isOperation ? 'by_desk' : 'by_category',
		},
		valueKey : 'raised_by_desk',
		labelKey : 'raised_by_desk',
	});

	const organizationUserOptions = useGetAsyncOptions({
		...asyncFieldsOrganizationUser(),
		params   : { filters: { organization_id: watchOrgId } },
		valueKey : 'user_id',

	});

	const ticketTypeOptions = useGetAsyncTicketOptions({
		...asyncFieldsTicketTypes(),
		params: {
			Audience         : 'cogoport_user',
			RequestType      : watchRequestType || undefined,
			Category         : watchCategory || undefined,
			Subcategory      : watchSubCategory || undefined,
			Service          : watchService || undefined,
			TradeType        : watchTradeType || undefined,
			RaisedByDesk     : watchRaisedByDesk || undefined,
			RaisedToDesk     : watchRaisedToDesk || undefined,
			CategoryDeskType : isOperation ? 'by_desk' : 'by_category',
		},
	});

	const serialIdOptions = useGetAsyncOptions({
		...asyncListShipments(),
		params: {
			filters: {
				importer_exporter_id : watchOrgId || undefined,
				user_id              : watchUserId || undefined,
			},
		},
		valueKey: 'serial_id',
	});

	const serviceSerialIdOptions = useGetAsyncOptions({
		...checkSid,
		params: {
			filters: {
				status: 'active',
			},
		},
		valueKey: 'serial_id',
	});

	const checkRequest = watchRequestType === 'rate' ? serviceSerialIdOptions : serialIdOptions;

	const controls = getCreateControls({
		t,
		checkRequest,
		ticketTypeOptions,
		organizationUserOptions,
		organizationOptions,
		categoryDeskOptions,
		resetField,
		setAdditionalInfo,
		setValue,
		formattedSubCategories,
		setRaiseToDesk,
		setSubCategories,
		formatRaiseToDeskOptions,
		setDefaultTypeId,
		isOperation,
	});

	return controls.filter((itm) => itm?.visible);
};

export default useRaiseTicketcontrols;
