import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const MARGIN_OFFSET = 200;

const useHandlePreviewBooking = ({ primaryService }) => {
	const { user:{ id } } = useSelector(({ profile }) => ({
		user: profile.user,
	}));

	const {
		commodity_category = '',
		cargo_readiness_date = '',
		cargo_value,
		cargo_value_currency = '',
	} = primaryService;

	const isGuideViewed = localStorage.getItem(`preview_booking_guide_completed_for_${id}`) || false;

	const [showBreakup, setShowBreakup] = useState(false);

	const [cargoDetails, setCargoDetails] = useState(() => ({
		commodity_category,
		cargo_readiness_date : cargo_readiness_date ? new Date(cargo_readiness_date) : undefined,
		cargo_value,
		cargo_value_currency : cargo_value_currency || GLOBAL_CONSTANTS.currency_code.USD,
	}));

	const [agreeTandC, setAgreeTandC] = useState(false);

	const [infoBanner, setInfoBanner] = useState({
		current      : !isGuideViewed && 'multiple_options',
		totalBanners : 5,
		buttonProps  : {
			multiple_options: {
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
							const element = document.getElementById('cargo_details');
							const offsetTop = element.offsetTop - MARGIN_OFFSET;
							window.scrollTo({ top: offsetTop, behavior: 'smooth' });
						},
					},
				],
				heading : 'Edit Coupoun Code or View Breakup or Unlock latest rate',
				content : `Want to add or edit Coupoun Code? Or, 
				want to see the price breakup? Or, want to unlock the latest rate`,
				subText         : 'Select the respective button from here.',
				sequence_number : 1,
			},
			cargo_details: {
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
							const element = document.getElementById('multiple_options');
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
							const element = document.getElementById('shipping_preferences');
							const offsetTop = element.offsetTop - MARGIN_OFFSET;
							window.scrollTo({ top: offsetTop, behavior: 'smooth' });
						},
						style: { marginLeft: '12px' },
					},
				],
				heading : 'Please provide some cargo details here',
				content : `please provide all the required details like Cargo Readiness Date, 
				Estimated Cargo Value and commodity here(* indicates compulsary)`,
				subText         : '',
				sequence_number : 2,
			},
			shipping_preferences: {
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
							const element = document.getElementById('cargo_details');
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
							const element = document.getElementById('additional_services');
							const offsetTop = element.offsetTop - MARGIN_OFFSET;
							window.scrollTo({ top: offsetTop, behavior: 'smooth' });
						},
						style: { marginLeft: '12px' },
					},
				],
				heading : 'Want to add shipping preferences',
				content : `Add or edit the shipping preferences from here which includes prefered shipping line,
				 or unprefered shipping line etc`,
				subText         : '',
				sequence_number : 3,
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
							const element = document.getElementById('shipping_preferences');
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
				sequence_number : 4,
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
				sequence_number : 5,
			},
		},
	});

	return {
		setInfoBanner,
		infoBanner,
		setShowBreakup,
		showBreakup,
		cargoDetails,
		setCargoDetails,
		agreeTandC,
		setAgreeTandC,
	};
};

export default useHandlePreviewBooking;
