import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick } from '@cogoport/icons-react';
import React from 'react';

import useCreateCheckout from '../../../../hooks/useCreateCheckout';

import SelectedServices from './SelectedServices';
import styles from './styles.module.css';

function BookCheckout({ data = {} }) {
	const { rate_card: rateCardData = {}, spot_search_detail: detail = {} } = data || {};

	const { total_price_discounted, total_price, total_price_currency = '' } = rateCardData;

	const { handleBook = () => {}, loading } = useCreateCheckout({
		rateCardData,
		spot_search_id: detail?.spot_search_id,
	});

	return (
		<div className={styles.container}>
			<div style={{
				display        : 'flex',
				justifyContent : 'space-between',
				alignItems     : 'center',
			}}
			>
				<div className={styles.congrats_text}>
					<IcCFtick width={48} height={48} />
					<div style={{ marginLeft: 16 }}>
						<div>Congratulations!</div>
						You are saving
						{' '}
						<strong>
							{formatAmount({
								amount   : (total_price - total_price_discounted),
								currency : total_price_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							})}
						</strong>
						{' '}
						on this booking.
					</div>
				</div>

				<div className={styles.button_wrapper}>
					{/* <Button
						onClick={() => {

						}}
						size="md"
						themeType="secondary"
						className={styles.secondary_button}
						style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 24, paddingBottom: 24 }}
					>

						Share Quick Quotation
					</Button> */}
					<Button
						onClick={handleBook}
						size="md"
						themeType="accent"
						className={styles.primary_button}
						disabled={loading}
						style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 24, paddingBottom: 24 }}
					>
						Proceed to Book
					</Button>
				</div>
			</div>

			<div className={styles.selected_services_container}>
				<div className={styles.heading}>Following services has been added successfully to your freight</div>

				<SelectedServices
					rateDetails={rateCardData}
					details={detail}
				/>
			</div>
		</div>
	);
}
export default BookCheckout;
