export const getDetentionDemurrageDays = ({
	services,
	detailedServices,
	source,
	primaryService,
}) => {
	let originDetention = '';
	let originDemurrage = '';
	let destinationDetention = '';
	let destinationDemurrage = '';

	if (source === 'direct') {
		const primaryServices = detailedServices.map((per_service) => {
			if (per_service?.service_type === primaryService?.service_type) {
				return per_service;
			}

			return undefined;
		})
			.filter((item) => item);
		const {
			free_days_origin_detention,
			free_days_origin_demurrage,
			free_days_destination_detention,
			free_days_destination_demurrage,
		} = primaryServices.reduce((acc, curr, index) => {
			const keys = [
				'free_days_origin_detention',
				'free_days_origin_demurrage',
				'free_days_destination_detention',
				'free_days_destination_demurrage',
			];

			const HASH = {};

			keys.forEach((key) => {
				HASH[key] = curr[key] || 0;
			});

			if (index === 0) {
				return HASH;
			}

			const RETURN_HASH = {};
			keys.forEach((key) => {
				RETURN_HASH[key] = Math.min(acc[key], HASH[key]);
			});

			return RETURN_HASH;
		}, {});

		originDetention = free_days_origin_detention;
		originDemurrage = free_days_origin_demurrage;
		destinationDetention = free_days_destination_detention;
		destinationDemurrage = free_days_destination_demurrage;
	} else {
		const primaryServices = (Object.values(services) || [])
			.map((per_service) => {
				if (per_service?.service_type === primaryService?.service_type) {
					return per_service;
				}

				return undefined;
			})
			.filter((item) => item);

		const {
			origin_detention,
			origin_demurrage,
			destination_detention,
			destination_demurrage,
		} = primaryServices.reduce((acc, curr, index) => {
			const keys = [
				'origin_detention',
				'origin_demurrage',
				'destination_detention',
				'destination_demurrage',
			];

			const HASH = {};
			keys.forEach((key) => {
				HASH[key] = (curr[key]?.free_limit || 0) + (curr[key]?.additional_days || 0);
			});

			if (index === 0) {
				return HASH;
			}

			const RETURN_HASH = {};
			keys.forEach((key) => {
				RETURN_HASH[key] = Math.min(acc[key], HASH[key]);
			});

			return RETURN_HASH;
		}, {});

		originDetention = origin_detention;
		originDemurrage = origin_demurrage;
		destinationDetention = destination_detention;
		destinationDemurrage = destination_demurrage;
	}

	return {
		originDetention,
		originDemurrage,
		destinationDemurrage,
		destinationDetention,
	};
};
