import { Accordion, Checkbox, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import getDefaultTncConfig from './getDefaultTncConfig';
import styles from './styles.module.css';

const PAGE_URL_MAPPING = {
	tnc              : 'https://www.cogoport.com/terms-and-conditions',
	'privacy-policy' : 'https://www.cogoport.com/privacy-policy',
};

const redirectUrl = (type) => {
	const url = PAGE_URL_MAPPING[type];

	window.open(url, '_blank');
};

function AccordionTitle({
	agreeTandC = false,
	setAgreeTandC = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.bold_700}>Important:</div>
				<div className={styles.bold_600}>Service Terms & Conditions</div>
			</div>

			<Checkbox
				label={(
					<span>
						By placing this booking, you are agreeing to the above
						{' '}
						<Button type="button" className={styles.button} themeType="linkUi">
							Service Terms and Conditions,
						</Button>
						<Button
							type="button"
							onClick={(e) => {
								redirectUrl('tnc');
								e.stopPropagation();
							}}
							className={styles.button}
							themeType="linkUi"
						>
							General Terms and Conditions
						</Button>
						and
						<Button
							type="button"
							onClick={(e) => {
								redirectUrl('privacy-policy');
								e.stopPropagation();
							}}
							className={styles.button}
							themeType="linkUi"
						>
							Privacy Policy
						</Button>
					</span>
				)}
				checked={agreeTandC}
				onChange={() => setAgreeTandC((prev) => !prev)}
			/>
		</div>
	);
}

function ServiceTerms({
	detail = {},
	agreeTandC = false,
	setAgreeTandC = () => {},
}) {
	const { terms_and_conditions: tncList, primary_service } = detail;

	const { country_id } = detail.importer_exporter || {};

	const list = !isEmpty(tncList)
		? tncList
		: getDefaultTncConfig(primary_service, country_id);

	return (
		<Accordion
			type="text"
			title={(
				<AccordionTitle
					agreeTandC={agreeTandC}
					setAgreeTandC={setAgreeTandC}
				/>
			)}
			className={styles.accordion}
		>
			<div className={styles.show_container}>
				{list.map((condition) => {
					const str = typeof condition === 'string' ? condition : condition?.message;

					return (
						<li key={str}>
							<span className={styles.text}>{str}</span>
						</li>
					);
				})}
			</div>
		</Accordion>
	);
}

export default ServiceTerms;
