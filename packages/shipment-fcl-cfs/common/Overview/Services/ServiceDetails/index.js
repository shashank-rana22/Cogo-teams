import Header from './Header';

function ServiceDetails({ servicesData = [], activeStakeholder = '' }) {
	const addedServiceComponent = (
		<Header serviceData={servicesData} activeStakeholder={activeStakeholder} />
	);

	return addedServiceComponent;
}

export default ServiceDetails;
