import AdditionalServicesForm from '../../../OtherServices/AdditionalServices/AdditionalServicesForm';

import EditDetailsHeader from './components/EditDetailsHeader';
import styles from './styles.module.css';

const SUB_HEADER_COMPONENT_MAPPING = {
	edit_details                : EditDetailsHeader,
	additional_services_details : AdditionalServicesForm,
};

function ExtraHeader({ headerProps = {}, createLoading = false, createSearch = () => {} }) {
	const ActiveComponent = SUB_HEADER_COMPONENT_MAPPING[headerProps?.key];

	if (!ActiveComponent) return null;

	return (
		<div className={styles.container}>
			<ActiveComponent
				{...headerProps}
				createLoading={createLoading}
				createSearch={createSearch}
			/>
		</div>
	);
}

export default ExtraHeader;
