import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect } from 'react';

import Contract from '../Contract';
import ShareToUsers from '../ShareToUsers';

import ComparisonTable from './ComparisonTable';
import Loading from './Loading';
import styles from './styles.module.css';
import getAllLineItems from './utils/getAllLineItems';
import getDyanmicLineItems from './utils/getDyanmicLineItems';
import getStaticLineItems from './utils/getStaticLineItems';

const TIMEOUT = 1000;

const DEFAULT_LINE_LOGO = {
	fcl_freight : GLOBAL_CONSTANTS.image_url.shipping_line_default_icon,
	air_freight : GLOBAL_CONSTANTS.image_url.airline_default_icon,
};

const toSnakeCase = (str) => str
	&& str
		.match(GLOBAL_CONSTANTS.regex_patterns.text_pattern_classifier)
		.map((x) => x.toLowerCase())
		.join('_');

function Comparison({
	detail = {},
	setScreen = () => {},
	mode = 'fcl_freight',
	comparisonRates = {},
	isMobile = false,
}) {
	const [loading, setLoading] = useState(false);
	const [showShare, setShowShare] = useState(false);
	const [showContract, setShowContract] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});

	const selectedCards = Object.values(comparisonRates);

	const { service_details = {} } = detail;

	const LOGO_MAPPING = {};

	const STATIC_LINE_ITEMS = {};
	const DYNMAIC_LINE_ITEMS = {};

	selectedCards.forEach((cardItem) => {
		const { service_rates = [], source, shipping_line, airline } = cardItem;

		const line = shipping_line || airline || {};

		const services = Object.entries(service_rates);

		const lineItems = services.flatMap(
			([key, service]) => (service?.line_items || []).map(
				(child) => ({ ...child, serviceObj: { service: { ...service, ...service_details[key] }, id: key } }),
			),
		);

		const staticLineItems = getStaticLineItems(
			cardItem,
			mode,
			detail,
			setSelectedCard,
			setShowContract,
		);

		const dynamicLineItems = getDyanmicLineItems(lineItems);

		const line_logo = line.logo_url || DEFAULT_LINE_LOGO[mode];

		const logo = source === 'cogo_assured_rate'
			? GLOBAL_CONSTANTS.image_url.cogo_assured_banner : line_logo;

		LOGO_MAPPING[toSnakeCase(line.short_name)] = logo;

		STATIC_LINE_ITEMS[`${toSnakeCase(line.short_name)}-${cardItem.id || cardItem.card}`] = staticLineItems;
		DYNMAIC_LINE_ITEMS[`${toSnakeCase(line.short_name)}-${cardItem.id || cardItem.card}`] = dynamicLineItems;
	});

	const allLineItems = getAllLineItems(STATIC_LINE_ITEMS, DYNMAIC_LINE_ITEMS);

	const handleBack = () => setScreen('listRateCard');

	useEffect(() => {
		setLoading(true);

		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

		setTimeout(() => {
			setLoading(false);
		}, TIMEOUT);
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>View Comparison</div>

				<div className={styles.buttons_container}>
					<Button
						onClick={handleBack}
						size={isMobile ? 'sm' : 'md'}
						themeType="link"
						className={styles.button}
						style={{ padding: '20px 16px' }}
					>
						Go Back
					</Button>

					<Button
						onClick={() => setShowShare(true)}
						size={isMobile ? 'sm' : 'md'}
						themeType="secondary"
						className={styles.button}
						style={{ padding: '20px 44px' }}
					>
						Share rate cards
					</Button>
				</div>
			</div>

			<ComparisonTable
				summary={detail}
				LOGO_MAPPING={LOGO_MAPPING}
				mode={mode}
				staticLineItems={STATIC_LINE_ITEMS}
				dynamicLineItems={DYNMAIC_LINE_ITEMS}
			/>

			{showShare ? (
				<ShareToUsers
					rate={{}}
					show={showShare}
					onClose={() => setShowShare(false)}
					shareType="compareRates"
					comparedRateCardDetails={allLineItems}
					source=""
					org_id={detail?.importer_exporter_id}
				/>
			) : null}

			{showContract ? (
				<Contract
					data={selectedCard}
					detail={detail}
					setShow={setShowContract}
					show={showContract}
				/>
			) : null}
		</div>
	);
}

export default Comparison;
