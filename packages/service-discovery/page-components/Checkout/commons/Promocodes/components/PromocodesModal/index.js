import { Modal, Input } from '@cogoport/components';
import { useState } from 'react';

import useGetCheckoutPromocodes from '../../hooks/useGetCheckoutPromocodes';
import useUpdateCheckoutPromotion from '../../hooks/useUpdateCheckoutPromotion';

import Empty from './Empty';
import Loading from './Loading';
import PromocodeThumbnail from './PromocodeThumbnail';
import styles from './styles.module.css';

function PromocodesModal({
	checkout_id = '',
	setShowCoupons = () => {},
	setCouponApplied = () => {},
	refetch = () => {},
	appliedPromotion = {},
	isCouponApplied = false,
	showCoupons = false,
}) {
	const [disableCursor, setDisableCursor] = useState('');

	const promoCodesBgColors = [
		'linear-gradient(90deg, rgba(204, 197, 249, 0.8) -4.34%, rgba(195, 216, 254, 0.6) 105.7%)',
		'linear-gradient(90deg, rgba(245, 191, 157, 0.7) 0%, rgba(239, 135, 152, 0.525) 105.39%)',
		'linear-gradient(90deg, rgba(209, 255, 241, 0.8) -4.74%, rgba(108, 188, 227, 0.6) 105.77%)',
		'linear-gradient(90deg, rgba(252, 237, 191, 0.8) -4.11%, rgba(239, 155, 96, 0.6) 105.32%)',
	];
	const promoCodesDashedBorderColors = [
		'1px dashed #8cc1f9',
		'1px dashed #f48e8e',
		'1px dashed #8CC1F9',
		'1px dashed #DA9A3B',
	];

	const {
		data,
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

	console.log('appliedPromotion', appliedPromotion);

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
		}
	};

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
						{(data.list || []).map((promotion, index) => (
							<div className={styles.item} key={promotion?.id}>
								<PromocodeThumbnail
									key={promotion}
									disableCursor={disableCursor}
									promotion={promotion}
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
						))}

						{loading && <Loading />}
						{!data.list?.length && !loading && <Empty />}
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default PromocodesModal;
