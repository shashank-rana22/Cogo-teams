import ORGANIZATION_SUBTYPE_OPTIONS from './organization-subtype-oprions';

function getModifiedControls({ controls, formValues }) {
	const newControls = controls.map((ctl) => {
		if (ctl.name === 'organization_sub_type') {
			return {
				...ctl,
				options: ORGANIZATION_SUBTYPE_OPTIONS?.[formValues?.organization_type] || [],
			};
		}
		if (ctl.name === 'organization_id') {
			return {
				...ctl,
				params: {
					...ctl.params,
					filters: {
						...ctl.params.filters,
						account_type:
							formValues?.margin_type === 'supply' ? 'service_provider' : 'importer_exporter',
						is_channel_partner: formValues?.organization_type === 'channel_partner',
					},
				},
			};
		}

		if (ctl.name === 'rate_type') {
			return {
				...ctl,
				options: [
					{ label: 'Marketplace Rate', value: 'market_place' },
					{ label: 'Promotional Rate', value: 'promotional' },
					...(['fcl_freight', 'air_freight'].includes(formValues?.service)
						? [
							{ label: 'Cogo Assured Rate', value: 'cogo_assured_rate' },
							{ label: 'Spot Booking', value: 'spot_booking' },
						]
						: []),
					...(['ftl_freight'].includes(formValues?.service)
						? [{ label: 'Cogo Assured Rate', value: 'cogo_assured_rate' }]
						: []),
				],
			};
		}

		return ctl;
	});

	return newControls;
}

export default getModifiedControls;
