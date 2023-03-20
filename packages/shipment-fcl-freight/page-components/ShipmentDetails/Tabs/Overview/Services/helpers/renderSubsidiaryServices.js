import { snakeCase } from '@cogoport/utils';

const displayServiceNames = ['EDT', 'DET', 'DEA', 'EDE'];

const renderSubsidiaryServices = (serviceObj = {}, serviceList = []) => {
	(serviceObj?.multipleMainService || []).forEach((mainServices) => {
		(mainServices?.services || []).forEach((singleService) => {
			const subsidiary_services = (serviceList || []).filter(
				(subService) => subService?.service_type === 'subsidiary_service'
					&& displayServiceNames.includes(subService?.code)
					&& singleService?.container_size === subService?.container_size
					&& singleService?.commodity === subService?.commodity,
			);

			subsidiary_services?.forEach((subService) => {
				// eslint-disable-next-line no-param-reassign
				singleService[snakeCase(subService?.service_type)] = subService?.preferred_rate_quantity;
			});
		});
	});
};

export default renderSubsidiaryServices;
