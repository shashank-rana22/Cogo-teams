import { Placeholder, Tooltip, Select } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import SegmentedControl from '../../../../commons/SegmentedControl/index';
import { SERVICE_PROVIDER, SHIPMENT_TYPE_OPTIONS, getSalesFunnelOptions } from '../../../constants/index';
import useGetSalesFunnel from '../../../hooks/useGetSalesFunnel';

import styles from './styles.module.css';

const DEFAULT_COUNT = 0;

function SalesFunnelView({ entityCode = '' }) {
	const { t = () => '' } = useTranslation(['accountRecievables']);
	const [filterValue, setFilterValue] = useState({ companyType: 'All' });

	const d = new Date();
	const currentMonth = GLOBAL_CONSTANTS.months[d.getMonth()];

	const [salesFunnelMonth, setSalesFunnelMonth] = useState(currentMonth);

	const { irn_label: irnLabel } = ENTITY_FEATURE_MAPPING[entityCode]?.labels || {};
	const onChange = (val, name) => {
		setFilterValue((p) => ({ ...p, [name]: val }));
	};

	const { salesFunnelLoading, salesFunnelData } = useGetSalesFunnel({
		companyType : filterValue?.companyType,
		entityCode,
		serviceType : filterValue?.serviceType,
		salesFunnelMonth,
	});

	return (
		<div className={styles.space_between}>
			<div className={styles.container}>
				<div className={styles.flex}>
					<div>
						<div className={styles.journey}>
							{t('sales_funnel')}
							<Tooltip
								content={(
									<div className={styles.tooltip}>
										{t('sales_funnel_tooltip')}
									</div>
								)}
								placement="top"
							>
								<div className={styles.icon}><IcMInfo height="18px" width="18px" /></div>
							</Tooltip>

						</div>
						<div className={styles.border} />
					</div>
					<div className={styles.selects}>
						<div className={styles.input}>
							<Select
								value={filterValue.serviceType}
								onChange={(val) => onChange(val, 'serviceType')}
								placeholder={t('service_type_placeholder')}
								options={SHIPMENT_TYPE_OPTIONS}
								isClearable
							/>
						</div>
						<div>
							<SegmentedControl
								options={SERVICE_PROVIDER}
								activeTab={filterValue.companyType}
								setActiveTab={(val) => (
									setFilterValue({ ...filterValue, companyType: val }))}
								background="#FFFAEB"
								color="#ED3726"
							/>
						</div>
						<div className={styles.date_filter}>
							<Select
								value={salesFunnelMonth}
								onChange={(val) => setSalesFunnelMonth(val)}
								placeholder={currentMonth}
								options={getSalesFunnelOptions(t)}
								isClearable
							/>
						</div>
					</div>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.containerblock}>
						<div className={styles.pill}>
							{salesFunnelLoading ? <Placeholder /> : (
								<>
									Draft:
									{' '}
									<span className={styles.span}>
										{salesFunnelData?.draftInvoicesCount || DEFAULT_COUNT}
									</span>
								</>
							)}
						</div>
						<div className={styles.mainline}>
							<div className={styles.mainline}>
								<div className={styles.percent}>
									{salesFunnelLoading ? <Placeholder width="20px" margin="4px 0px" />
										: `${salesFunnelData?.draftToFinanceAcceptedPercentage || DEFAULT_COUNT}%`}
								</div>
								<div className={styles.line} />
							</div>
						</div>
					</div>
					<div className={styles.containerblock}>
						<div className={styles.pill}>
							{salesFunnelLoading ? <Placeholder /> : (
								<>
									Finance Accepted:
									{' '}
									<span className={styles.span}>
										{salesFunnelData?.financeAcceptedInvoiceCount || DEFAULT_COUNT}
									</span>
								</>
							)}
						</div>
						<div className={styles.line} />
					</div>
					<div className={styles.middlecenter}>
						<div className={styles.containerblock}>
							<div className={styles.mainline}>
								<div className={styles.percent}>
									{salesFunnelLoading ? <Placeholder width="20px" margin="4px 0px" />
										: `${salesFunnelData?.financeToIrnPercentage || DEFAULT_COUNT}%`}
								</div>
								<div className={styles.line} />
							</div>
							<div className={styles.visibletop} />
							<div className={styles.pill}>
								{salesFunnelLoading ? <Placeholder /> : (
									<>
										<div className={styles.labelpill}>
											{irnLabel}
											{' '}
											Generated:
										</div>
										{' '}
										<span className={styles.span}>
											{salesFunnelData?.irnGeneratedInvoicesCount || DEFAULT_COUNT}
										</span>
									</>
								)}
							</div>
							<div className={styles.line} />
						</div>
						<div className={styles.containerblock}>
							<div className={styles.mainline}>
								<div className={styles.percent}>
									{salesFunnelLoading ? <Placeholder width="20px" margin="4px 0px" />
										: `${salesFunnelData?.financeToIrnFailedPercentage || DEFAULT_COUNT}%`}
								</div>
								<div className={styles.line} />
							</div>
							<div className={styles.visiblebottom} />
							<div className={styles.pill}>
								{salesFunnelLoading ? <Placeholder /> : (
									<>
										<div className={styles.labelpill}>
											{irnLabel}
											{' '}
											Failed:
										</div>
										{' '}
										<span className={styles.span}>
											{salesFunnelData?.irnFailedInvoicesCount || DEFAULT_COUNT}
										</span>
									</>
								)}
							</div>
						</div>
					</div>
					<div className={styles.middlecenter}>
						<div className={styles.containerblock}>
							<div className={styles.mainline}>
								<div className={styles.percent}>
									{salesFunnelLoading ? <Placeholder width="20px" margin="4px 0px" />
										: `${salesFunnelData?.settledPercentage || DEFAULT_COUNT}%`}
								</div>
								<div className={styles.line} />
							</div>
							<div className={styles.visibletop} />
							<div className={styles.pill}>
								{salesFunnelLoading ? <Placeholder /> : (
									<>
										SETTLED:
										{' '}
										<span className={styles.span}>
											{salesFunnelData?.settledInvoicesCount || DEFAULT_COUNT}
										</span>
									</>
								)}
							</div>
						</div>
						<div className={styles.containerblock}>
							<div className={styles.mainline}>
								<div className={styles.percent}>
									{salesFunnelLoading ? <Placeholder width="20px" margin="4px 0px" />
										: `${salesFunnelData?.irnGenToIrnCancelledPercentage || DEFAULT_COUNT}%`}
								</div>
								<div className={styles.line} />
							</div>
							<div className={styles.visiblebottom} />
							<div className={styles.pill}>
								{salesFunnelLoading ? <Placeholder /> : (
									<>
										<div className={styles.labelpill}>
											{irnLabel}
											{' '}
											Cancelled:
										</div>
										{' '}
										<span className={styles.span}>
											{salesFunnelData?.irnCancelledInvoicesCount || DEFAULT_COUNT}
										</span>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default SalesFunnelView;
