import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowBack, IcMPortArrow } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';

import HeaderLoading from '../../../common/EmptyState/HeaderLoading';

import styles from './styles.module.css';

const NEGATIVE_INDEX = 1;
const START_INDEX = 0;
const MAX_LENGTH = 16;

function RenderPortName({ portName = '' }) {
	return (
		<Tooltip content={<div style={{ color: 'grey' }}>{portName}</div>}>
			<div>
				{portName?.substring(START_INDEX, MAX_LENGTH) || ''}
				{portName.length > MAX_LENGTH ? '...' : null}
			</div>
		</Tooltip>
	);
}

function PortNames({ locationInfo = {} }) {
	const splitDisplayName = (locationInfo?.display_name || '').split(',');

	const displayNameLength = splitDisplayName?.length;

	const countryName = locationInfo?.country?.name
        || splitDisplayName[displayNameLength - NEGATIVE_INDEX]
        || '';

	const portCode = locationInfo?.port_code || '';
	const portName = locationInfo?.name?.split('(')[GLOBAL_CONSTANTS.zeroth_index].split('-')[
		GLOBAL_CONSTANTS.zeroth_index
	] || '';

	return (
		<div className={styles.port_info_container}>
			<div className={styles.port_info}>
				<span>
					<RenderPortName portName={portName} />
				</span>
				{portCode ? (
					<span className={styles.port_code}>
						(
						{portCode}

						)
					</span>
				) : null}
			</div>
			<div className={styles.country_name}>
				,
				{' '}
				{countryName}
			</div>
		</div>
	);
}

function Header({
	origin_location = {}, destination_location = {},
	week_info = {}, total_estimated_demand = '',
	loading = true,
}) {
	const router = useRouter();
	const { t } = useTranslation(['demandForecast']);
	const startDate = formatDate({
		date       : week_info?.start_date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
		separator  : ' | ',
	});

	const endDate = formatDate({
		date       : week_info?.end_date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
		separator  : ' | ',
	});

	const onBack = () => {
		router.back();
	};

	return (
		loading ? <HeaderLoading />
			: (
				<div className={styles.header}>
					<div className={styles.back}>
						<IcMArrowBack height={24} width={24} onClick={onBack} />
					</div>

					<div className={styles.location_info}>
						<PortNames locationInfo={origin_location} />
						<div>
							<IcMPortArrow />
						</div>
						<PortNames locationInfo={destination_location} />
					</div>

					<div className={styles.forecasted_demand}>
						<div className={styles.header_title}>{t('demandForecast:forecasted_demands')}</div>
						<div className={styles.value}>
							{total_estimated_demand}
							{' '}
							TEUs
						</div>
					</div>

					<div className={styles.forecasted_dates}>
						<div className={styles.header_title}>{t('demandForecast:forecasted_dates')}</div>
						<div className={styles.value}>
							{startDate}
							{' '}
							-
							{endDate}
						</div>
					</div>
				</div>
			));
}

export default Header;
