import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useRef, useState } from 'react';

import SERVICE_NAME_MAPPING from '../helpers/service-name-mapping';

// const getPayload = (val) => Object.keys(val).map((item) => ({
// 	from  : item.split('_')?.[GLOBAL_CONSTANTS.zeroth_index],
// 	to    : item.split('_')?.[1],
// 	value : val[item],
// }));

const options = Object.values(SERVICE_NAME_MAPPING);

options.unshift({
	label           : 'GLOBAL SETTING',
	value           : 'global',
	backgroundColor : '#393f70',
	color           : '#fff',
});

const getButtonLabel = (list, item) => {
	let label = 'Set Margin';

	const foundEntity = (list || []).find(
		(element) => element.from_entity_id === item?.[GLOBAL_CONSTANTS.zeroth_index]?.id
		&& element.to_entity_id === item?.[1]?.id,
	);

	if (!isEmpty(foundEntity)) {
		label = 'View/Edit Margin';
	}

	return label;
};

function useGetMultiEntityMargin() {
	const [activeService, setActiveService] = useState('fcl_freight');

	const [showModal, setShowModal] = useState({});

	const formRef = useRef(null);

	const [activeEntities, setActiveEntities] = useState([]);

	const [{ data, loading: loadingListCogoEntities }] = useRequest(
		{
			url    : '/list_cogo_entities',
			method : 'GET',
			params : { pagination_data_required: false, filters: { status: 'active' } },
		},
		{ manual: false },
	);

	const [{ loading, data: listEntityMarginsData }, triggerListEntityMargins] = useRequest(
		{
			url    : '/list_entity_margins',
			method : 'GET',
			params : { pagination_data_required: false, filters: { status: 'active' } },
		},
		{ manual: false },
	);

	const { control, watch, handleSubmit } = useForm();

	const formValues = watch();

	const newCogoEntitiesList = (data?.list || []).map((item) => {
		const arr = (data?.list || []).map((i) => [item, i]);
		arr.unshift(item);
		return arr;
	});

	const entityNames = ((data?.list || []) || []).map((i) => i.business_name);

	entityNames.unshift('--');

	newCogoEntitiesList.unshift(entityNames);

	const submitSlabDetails = () => formRef?.current?.submitFun();

	const showHighlighted = (rI, cI, ri, ci) => {
		if ((activeEntities[GLOBAL_CONSTANTS.zeroth_index]?.business_name
			=== cI.business_name
			|| activeEntities[1]?.business_name === rI?.[ci])
			&& (!isEmpty(activeEntities))) {
			return true;
		}
		return false;
	};

	return {
		activeService,
		setActiveService,
		control,
		showModal,
		setShowModal,
		formValues,
		options,
		cogoEntitiesList  : data?.list || [],
		loadingListCogoEntities,
		handleSubmit,
		submitSlabDetails,
		showHighlighted,
		setActiveEntities,
		newCogoEntitiesList,
		loading,
		entityMarginsList : listEntityMarginsData?.list || [],
		formRef,
		getButtonLabel,
		triggerListEntityMargins,
	};
}

export default useGetMultiEntityMargin;
