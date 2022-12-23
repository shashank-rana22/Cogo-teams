const getAsyncFields = (key: string) => {
	if (key === 'cogo-entities') {
		return {
			finalValueKey  : 'entity_code',
			finalLabelKey  : 'entity_code',
			endpoint       : 'list_cogo_entities',
			defaultOptions : true,
			defaultParams  : {
				filters    : { status: 'active' },
				page_limit : 100,
				page       : 1,
			},
		};
	}

	if (key === 'locations') {
		return {
			finalValueKey  : 'id',
			finalLabelKey  : 'name',
			endpoint       : 'list_locations',
			defaultOptions : false,
			defaultParams  : {
				filters    : { status: 'active' },
				page_limit : 10,
				sort_by    : 'name',
				sort_type  : 'asc',
				includes   : { country: null, main_ports: null },
			},
		};
	}

	if (key === 'locations_v2') {
		return {
			finalValueKey : 'id',
			finalLabelKey : 'name',
			endpoint      : 'list_locations_v2',
			defaultParams : {
				filters    : { status: 'active' },
				page_limit : 20,
				includes   : { country: null, main_ports: null },
			},
		};
	}

	return null;
};

useGetAsyncProps({
	valueKey : 'id',
	labelKey : 'name',
	endpoint      : 'list_locations_v2',
	defaultParams : {
		filters    : { status: 'active' },
		page_limit : 20,
		includes   : { country: null, main_ports: null },
	},
})

function useAsyncLocations() {
	return useGetAsyncProps({
		valueKey : 'id',
		labelKey : 'name',
		endpoint      : 'list_locations_v2',
		defaultParams : {
			filters    : { status: 'active' },
			page_limit : 20,
			includes   : { country: null, main_ports: null },
		},
	})
}




const locationsSelectProps = useAsyncLocations()
{...locationsSelectProps}



export default getAsyncFields;
