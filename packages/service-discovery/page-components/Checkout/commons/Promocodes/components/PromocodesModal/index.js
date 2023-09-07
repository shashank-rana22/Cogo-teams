import { Modal, Input, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetCheckoutPromocodes from '../../hooks/useGetCheckoutPromocodes';
import useUpdateCheckoutPromotion from '../../hooks/useUpdateCheckoutPromotion';

import Empty from './Empty';
import Loading from './Loading';
import PromocodeThumbnail from './PromocodeThumbnail';
import styles from './styles.module.css';

const PROMOTION_ONE_FIRST = -1;
const PROMOTION_TWO__FIRST = 1;
const BOTH_EQUAL = 0;

function PromocodesModal({
	checkout_id = '',
	setShowCoupons = () => {},
	setCouponApplied = () => {},
	refetch = () => {},
	appliedPromotion = {},
	isCouponApplied = false,
	showCoupons = false,
	disableCursor = '',
	setDisableCursor = () => {},
}) {
	const [eligiblePromotions, setEligiblePromotions] = useState([]);

	const promoCodesBgColors = [
		'linear-gradient(90deg, rgba(204, 197, 249, 0.8) -4.34%, rgba(195, 216, 254, 0.6) 105.7%)',
		'linear-gradient(90deg, rgba(245, 191, 157, 0.7) 0%, rgba(239, 135, 152, 0.525) 105.39%)',
		'linear-gradient(90deg, rgba(209, 255, 241, 0.8) -4.74%, rgba(108, 188, 227, 0.6) 105.77%)',
		'linear-gradient(90deg, rgba(252, 237, 191, 0.8) -4.11%, rgba(239, 155, 96, 0.6) 105.32%)',
	];
	const promoCodesDashedBorderColors = [
		'1px dashed #8cc1f9',
		'1px dashed #f48e8e',
		'1px dashed #8cc1f9',
		'1px dashed #da9a3b',
	];

	const {
		data : { list = [] },
		loading,
		setInput = () => {},
		getCheckoutPromocodes = () => {},
		input = '',
	} = useGetCheckoutPromocodes({
		checkout_id,
	});

	const { updateCheckoutPromotion, checkoutLoading } = useUpdateCheckoutPromotion({
		checkout_id,
	});

	if (checkoutLoading && disableCursor !== 'not-allowed') {
		setDisableCursor('not-allowed');
	}

	const removeCoupon = async () => {
		const applyRes = await updateCheckoutPromotion(
			appliedPromotion?.id,
			'inactive',
		);
		if (applyRes) {
			await refetch();
			setCouponApplied(false);
			setDisableCursor('');
			setShowCoupons(false);
		}
	};

	useEffect(() => {
		if (!isEmpty(list)) {
			setEligiblePromotions(
				list.filter((promotion) => promotion?.eligibility_checks?.is_eligible),
			);
		}
	}, [list]);

	const reorderedList = eligiblePromotions?.sort((promotionOne, promotionTwo) => {
		const isPromotionOneApplicable = promotionOne?.eligibility_checks?.is_applicable;
		const isPromotionTwoApplicable = promotionTwo?.eligibility_checks?.is_applicable;

		if (isPromotionOneApplicable && !isPromotionTwoApplicable) {
			return PROMOTION_ONE_FIRST;
		}
		if (!isPromotionOneApplicable && isPromotionTwoApplicable) {
			return PROMOTION_TWO__FIRST;
		}
		return BOTH_EQUAL;
	});

	return (
		<Modal
			onClose={() => setShowCoupons(false)}
			show={showCoupons}
			size="lg"
			style={{ cursor: disableCursor }}
			className={styles.modal}
		>
			<Modal.Header title="Promo codes" />

			<Modal.Body>
				<div className={styles.promocode_container}>
					<div className={styles.search_div}>
						<Input
							value={input}
							onChange={setInput}
							placeholder="Enter Promo code here...."
						/>

						<div
							role="presentation"
							className={styles.apply_button}
							onClick={getCheckoutPromocodes}
						>
							Search
						</div>
					</div>

					{isCouponApplied && (
						<div className={styles.remove_offer_div}>
							<div
								role="presentation"
								className={styles.remove_link}
								onClick={removeCoupon}
							>
								Remove Offer
							</div>
							<div className={styles.offer_text}>(This will apply the initial discount)</div>
						</div>
					)}
				</div>

				<div className={styles.container}>
					<div className={styles.details_title}>More offers available:</div>

					<div className={styles.flex}>
						{(reorderedList || []).map((promotion, index) => {
							const {
								is_applicable,
								non_applicability_reasons = [],
							} = promotion?.eligibility_checks || {};

							if (is_applicable) {
								return (
									<div className={styles.item} key={promotion?.id}>
										<PromocodeThumbnail
											key={promotion}
											disableCursor={disableCursor}
											promotion={promotion}
											is_applicable={is_applicable}
											setShowCoupons={setShowCoupons}
											setCouponApplied={setCouponApplied}
											refetch={refetch}
											updateCheckoutPromotion={updateCheckoutPromotion}
											bgColor={
										promoCodesBgColors[index % promoCodesBgColors.length]
									}
											dashedColor={
										promoCodesDashedBorderColors[
											index % promoCodesDashedBorderColors.length]
									}
										/>
									</div>
								);
							}

							return (
								<div className={styles.item} key={promotion?.id}>
									<Tooltip
										{...(!isEmpty(non_applicability_reasons)
											? {
												content:
												<div className={styles.tooltip_content}>
													{non_applicability_reasons?.
														[GLOBAL_CONSTANTS.zeroth_index] || ''}

												</div>,
											}
											: {})}
										maxWidth={400}
										interactive
										key={promotion.id}
									>

										<PromocodeThumbnail
											key={promotion}
											disableCursor={disableCursor}
											promotion={promotion}
											setShowCoupons={setShowCoupons}
											is_applicable={is_applicable}
											setCouponApplied={setCouponApplied}
											refetch={refetch}
											updateCheckoutPromotion={updateCheckoutPromotion}
											bgColor={
										promoCodesBgColors[index % promoCodesBgColors.length]
									}
											dashedColor={
										promoCodesDashedBorderColors[
											index % promoCodesDashedBorderColors.length]
									}
										/>

									</Tooltip>
								</div>

							);
						})}

						{loading && <Loading />}
						{!reorderedList?.length && !loading && <Empty />}
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default PromocodesModal;
