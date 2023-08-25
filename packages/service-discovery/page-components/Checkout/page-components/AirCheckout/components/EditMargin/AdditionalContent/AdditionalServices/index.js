import { Accordion, Popover } from '@cogoport/components';
import { dynamic } from '@cogoport/next';

import InfoBannerContent from '../../../../../../../../common/InfoBannerContent';
import AdditionalServicesComponent from '../../../../../../../../common/OtherServices/AdditionalServices';
import SubsidiaryServices from '../../../../../../../../common/OtherServices/SubsidiaryServices';

import styles from './styles.module.css';

const CargoInsurance = dynamic(
	() => import(
		'../../../../../../../../common/OtherServices/CargoInsurance'
	),
	{ ssr: false },
);

const MAX_SERVICES_LENGTH = 3;

function AdditionalServices({
	setHeaderProps = () => {},
	rate = {},
	detail = {},
	primaryService = {},
	getCheckout = () => {},
	possible_subsidiary_services = [],
	loading = false,
	servicesLength = 0,
	infoBanner = {},
	setInfoBanner = () => {},
	nextGuide = 'proceed_button',
	prevGuide = 'add_or_edit_margin',
}) {
	const { services, id, ...restDetails } = detail;

	const { services:serviceRates } = rate;

	const { inco_term = '' } = primaryService;

	const finalDetails = { ...primaryService, ...restDetails, service_details: services, inco_term, checkout_id: id };

	const rateCardData = { ...rate, service_rates: serviceRates, service_type: restDetails.primary_service };

	const { current, buttonProps = {}, totalBanners = 1 } = infoBanner;

	return (
		<Accordion
			className={styles.accordion}
			id="additional_services"
			type="form"
			isOpen={servicesLength < MAX_SERVICES_LENGTH}
			title={(
				<Popover
					placement="bottom"
					caret
					visible={current === 'additional_services'}
					render={(
						<InfoBannerContent
							popoverComponentData={buttonProps.additional_services || {}}
							totalBanners={totalBanners}
							setInfoBanner={setInfoBanner}
							guideKey="edit_margin_guide_completed_for"
							nextGuide={nextGuide}
							prevGuide={prevGuide}
						/>
					)}
				>
					Looking for additional services?
				</Popover>
			)}
			animate
		>
			<AdditionalServicesComponent
				detail={finalDetails}
				rateCardData={rateCardData}
				setHeaderProps={setHeaderProps}
				refetchSearch={getCheckout}
				searchLoading={loading}
				source="checkout"
			/>

			<CargoInsurance
				key={loading}
				data={finalDetails}
				rateCardData={rateCardData}
				refetch={getCheckout}
			/>

			<SubsidiaryServices
				possible_subsidiary_services={possible_subsidiary_services}
				data={finalDetails}
				refetch={getCheckout}
				checkout_id={id}
			/>
		</Accordion>
	);
}

export default AdditionalServices;
