import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { useState, useContext } from 'react';

import BreakdownDetails from '../../../../commons/BreakdownDetails';
import { CheckoutContext } from '../../../../context';

import AdditionalContent from './AdditionalContent';
import styles from './styles.module.css';

const MARGIN_OFFSET = 200;

function EditMargin({ state = '' }) {
	const { user:{ id } } = useSelector(({ profile }) => ({
		user: profile.user,
	}));

	const { rate = {} } = useContext(CheckoutContext);

	const convenience_line_item = rate?.booking_charges?.convenience_rate?.line_items[GLOBAL_CONSTANTS.zeroth_index];

	const isGuideViewed = localStorage.getItem(`edit_margin_guide_completed_for_${id}`) || false;

	const [rateDetails, setRateDetails] = useState([]);
	const [convenienceDetails, setConvenienceDetails] = useState(() => ({
		convenience_rate: {
			price    : convenience_line_item?.price,
			currency : convenience_line_item?.currency,
			unit     : convenience_line_item?.unit,
			quantity : convenience_line_item?.quantity,
		},
	}));
	const [noRatesPresent, setNoRatesPresent] = useState(false);
	const [infoBanner, setInfoBanner] = useState({
		current      : !isGuideViewed && 'add_or_edit_margin',
		totalBanners : 3,
		buttonProps  : {
			add_or_edit_margin: {
				buttons: [
					{
						label     : 'Close',
						themeType : 'link',
						type      : 'button',
						name      : 'close',
					},
					{
						label           : 'Next',
						themeType       : 'accent',
						type            : 'button',
						name            : 'next',
						size            : 'sm',
						onclickFunction : () => {
							const element = document.getElementById('additional_services');
							const offsetTop = element.offsetTop - MARGIN_OFFSET;
							window.scrollTo({ top: offsetTop, behavior: 'smooth' });
						},
					},
				],
				heading : 'Add or Edit Margin',
				content : `Want to add margin? Or, 
				want to update the current one?`,
				subText         : 'Update it from here.',
				sequence_number : 1,
			},
			additional_services: {
				buttons: [
					{
						label     : 'Close',
						themeType : 'link',
						type      : 'button',
						name      : 'close',
					},
					{
						label           : 'Prev',
						themeType       : 'accent',
						type            : 'button',
						name            : 'prev',
						onclickFunction : (e) => {
							e.stopPropagation();
							e.preventDefault();
							const element = document.getElementById('add_or_edit_margin');
							const offsetTop = element.offsetTop - MARGIN_OFFSET;
							window.scrollTo({ top: offsetTop, behavior: 'smooth' });
						},
						size: 'sm',
					},
					{
						label           : 'Next',
						themeType       : 'primary',
						type            : 'button',
						name            : 'next',
						size            : 'sm',
						onclickFunction : (e) => {
							e.stopPropagation();
							e.preventDefault();
							const element = document.getElementById('proceed_button');
							const offsetTop = element.offsetTop - MARGIN_OFFSET;
							window.scrollTo({ top: offsetTop, behavior: 'smooth' });
						},
						style: { marginLeft: '12px' },
					},
				],
				heading         : 'Add to Edit Additional services from here',
				content         : 'Add or edit the required additional services from here',
				subText         : '',
				sequence_number : 2,
			},
			proceed_button: {
				buttons: [
					{
						label     : 'Close',
						themeType : 'link',
						type      : 'button',
						name      : 'close',
					},
					{
						label           : 'Prev',
						themeType       : 'accent',
						type            : 'button',
						name            : 'prev',
						size            : 'sm',
						onclickFunction : () => {
							const element = document.getElementById('additional_services');
							const offsetTop = element.offsetTop - MARGIN_OFFSET;
							window.scrollTo({ top: offsetTop, behavior: 'smooth' });
						},
					},
				],
				heading : 'Procced to next or Save for Later',
				content : `To save the margin(s) that you added and continue click "Save Margin And Proceed" 
				or to save and visit back later please click "Save for Later"`,
				subText         : '',
				sequence_number : 3,
			},
		},
	});

	return (
		<div>
			<BreakdownDetails
				rateDetails={rateDetails}
				setRateDetails={setRateDetails}
				convenienceDetails={convenienceDetails}
				setConvenienceDetails={setConvenienceDetails}
				setNoRatesPresent={setNoRatesPresent}
				source="edit_margin"
				setInfoBanner={setInfoBanner}
				infoBanner={infoBanner}
			/>

			{noRatesPresent ? (
				<div className={styles.error}>
					** REMOVE SERVICES WITH (NO RATES) TAG TO SEND QUOTATION.
				</div>
			) : null}

			<AdditionalContent
				rateDetails={rateDetails}
				convenienceDetails={convenienceDetails}
				convenience_line_item={convenience_line_item}
				noRatesPresent={noRatesPresent}
				state={state}
				setInfoBanner={setInfoBanner}
				infoBanner={infoBanner}
			/>
		</div>
	);
}

export default EditMargin;
