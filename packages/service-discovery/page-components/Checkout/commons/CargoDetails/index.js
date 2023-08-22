import { Datepicker, Input, Popover, Select, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import InfoBannerContent from '../../../../common/InfoBannerContent';
import currencies from '../../helpers/currencies';

import styles from './styles.module.css';
import useGetCommodityOptions from './useGetCommodityOptions';

function CargoDetails({
	cargoDetails = {},
	setCargoDetails = () => {},
	detail = {},
	primaryService = {},
	setInfoBanner = () => {},
	infoBanner = {},
}) {
	const { commodityTypeOptions = [], loading = false } = useGetCommodityOptions({ detail });

	const { current, buttonProps = {}, totalBanners = 1 } = infoBanner;

	const MAPPING = [
		{
			heading         : 'Your Cargo will be ready by',
			label           : 'Cargo Readiness Date',
			backgroundColor : '#effefe',
			border          : '1px solid #F3FAFA',
			component       : Datepicker,
			key             : 'cargo_readiness_date',
			icon            : GLOBAL_CONSTANTS.image_url.cargo_readiness_date_s2c_png,
			componentProps  : {
				minDate     : new Date(),
				placeholder : 'Select Date',
				maxDate     : new Date(primaryService?.departure || ''),
				name        : 'date',
			},
		},
		{
			heading         : 'Estimated Cargo Value',
			label           : 'Value',
			backgroundColor : '#f5edfc',
			border          : '1px solid #F3FAFA',
			component       : Select,
			component2      : Input,
			type            : 'cargo_value',
			key             : 'cargo_value_currency',
			component2Key   : 'cargo_value',
			icon            : GLOBAL_CONSTANTS.image_url.cargo_value_s2c_png,
			componentProps  : {
				type        : 'select',
				style       : { width: '40%', paddingRight: '12px' },
				placeholder : 'currency',
				options     : currencies,
			},
			component2Props: {
				type        : 'number',
				style       : { width: '60%' },
				placeholder : 'value',
			},
		},
		{
			heading         : 'Commodity we’re transporting',
			label           : 'Select Commodity Type',
			backgroundColor : '#f9f1e7',
			border          : '1px solid #F3FAFA',
			component       : Select,
			key             : 'commodity_category',
			icon            : GLOBAL_CONSTANTS.image_url.hs_code_s2c_png,
			componentProps  : {
				options: commodityTypeOptions,
			},
		},
	];

	return (
		<div className={styles.container} id="cargo_details">
			{MAPPING.map((item) => {
				const {
					heading,
					label,
					component: ActiveComponent,
					key,
					type = '',
					componentProps = {},
					component2:ActiveComponent2,
					component2Props,
					icon: iconUrl,
					component2Key,
					...styleProps
				} = item;

				return (
					<div key={`${key}_${loading}`} className={styles.item_container}>
						<Popover
							placement="bottom"
							caret
							visible={current === 'cargo_details' && key === 'cargo_readiness_date'}
							className={styles.popover_container}
							render={(
								<InfoBannerContent
									popoverComponentData={buttonProps.cargo_details || {}}
									totalBanners={totalBanners}
									setInfoBanner={setInfoBanner}
									guideKey="preview_booking_guide_completed_for"
									nextGuide="shipping_preferences"
									prevGuide="multiple_options"
								/>
							)}
						>
							<div className={styles.heading}>
								{heading}
								<sup className={styles.superscipt}>*</sup>
							</div>
						</Popover>

						<div className={styles.content} style={{ ...styleProps }}>
							<img src={iconUrl} width={44} height={44} alt="Empty-state" />

							<div className={cl`${styles.control_item} ${styles[key]}`}>
								<div className={styles.label}>
									{label}
								</div>

								{type === 'cargo_value' ? (
									<div className={styles.flex}>
										<ActiveComponent
											{...componentProps}
											value={cargoDetails[key]}
											onChange={(value) => {
												setCargoDetails((prev) => ({ ...prev, [key]: value }));
											}}
										/>

										<ActiveComponent2
											{...component2Props}
											value={cargoDetails[component2Key]}
											onChange={(value) => {
												setCargoDetails((prev) => ({ ...prev, [component2Key]: value }));
											}}
										/>
									</div>
								) : (
									<ActiveComponent
										{...componentProps}
										value={cargoDetails[key]}
										onChange={(value) => {
											setCargoDetails((prev) => ({ ...prev, [key]: value }));
										}}
									/>
								)}

							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default CargoDetails;
