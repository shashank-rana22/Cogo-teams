import { Popover } from '@cogoport/components';
import { AsyncSelectController, ChipsController } from '@cogoport/forms';
import { useEffect } from 'react';

import InfoBannerContent from '../../../../../../../../common/InfoBannerContent';

import styles from './styles.module.css';

function UnpreferredShippingLines({
	formProps = {},
	primaryService = {},
	setInfoBanner = () => {},
	infoBanner = {},
}) {
	const {
		control,
		formState: { errors = {} },
		setValue = () => {},
	} = formProps;

	const { shipping_preferences = {} } = primaryService;

	const { current, buttonProps = {}, totalBanners = 1 } = infoBanner;

	useEffect(() => {
		const {
			agreed_for_partial_shipment = false,
			unpreferred_shipping_line_ids = [],
		} = shipping_preferences || {};

		setValue('agreed_for_partial_shipment', agreed_for_partial_shipment ? 'yes' : 'no');
		setValue('unpreferred_shipping_line_ids', unpreferred_shipping_line_ids);
	}, [setValue, shipping_preferences]);

	return (
		<div className={styles.container} id="shipping_preferences">
			<Popover
				placement="bottom"
				caret
				visible={current === 'shipping_preferences'}
				render={(
					<InfoBannerContent
						popoverComponentData={buttonProps.shipping_preferences || {}}
						totalBanners={totalBanners}
						setInfoBanner={setInfoBanner}
						guideKey="preview_booking_guide_completed_for"
						nextGuide="additional_services"
						prevGuide="cargo_details"
					/>
				)}
			>
				<div className={styles.header}>Unpreferred shipping lines</div>
			</Popover>

			<div className={styles.text}>
				Unpreferred shipping lines will not be considered for your shipment.
				This will help us in getting you a better deal.
			</div>

			<AsyncSelectController
				control={control}
				asyncKey="list_operators"
				name="unpreferred_shipping_line_ids"
				multiple
				className={styles.select}
				initialCall
				params={{
					filters    : { operator_type: 'shipping_line', status: 'active' },
					page_limit : 100,
					sort_by    : 'short_name',
					sort_type  : 'asc',
				}}
			/>

			{errors?.unpreferred_shipping_line_ids?.message ? (
				<div className={styles.error_message}>
					{errors?.unpreferred_shipping_line_ids?.message}
				</div>
			) : null}

			<div className={styles.partial_load}>
				In some rare occasion, we may break the shipment and
				send via different ships, is that okay with you?

				<ChipsController
					style={{ marginLeft: '12px' }}
					control={control}
					name="agreed_for_partial_shipment"
					type="chips"
					options={[
						{ value: 'no', label: 'No' },
						{ value: 'yes', label: 'Yes' },
					]}
					size="lg"
					enableMultiSelect={false}
				/>
			</div>
		</div>
	);
}

export default UnpreferredShippingLines;
