import { Select } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';

import SegmentedControl from '../../../commons/SegmentedControl';
import { SERVICE_PROVIDER, SHIPMENT_TYPE_OPTIONS } from '../../constants';
import useReceivablesDashboard from '../../hooks/useReceivablesDashboard';

import DailySales from './DailySales';
import DailySalesOutstanding from './DailySalesOutstanding/index';
import DateAndAccount from './DateAndAccount';
import InvoiceJourney from './InvoiceJourney';
import OutstandingAge from './OutstandingAge';
import OutStandingKam from './OutstandingKam';
import SalesFunnel from './SalesFunnel';
import ServiceCard from './ServiceCard';
import styles from './styles.module.css';

function Dashboard() {
	const {
		dashboard,
		loading,
		filterValue,
		setFilterValue,
		salesFunnelMonth,
		setSalesFunnelMonth,
	} = useReceivablesDashboard();

	const {
		outstandingAgeData = [],
		dailySalesOutstandingData = [],
		quaterly = [],
		kamOutstandingData = [],
		outstandingData = {},
		salesFunnelData = {},
	} = dashboard || {};

	const {
		outstandingAgeData: outstandingAgeLoading,
		dailySalesOutstandingApiLoading,
		quaterly: quaterlyLoading,
		kamOutstandingLoading,
		outstandingLoading,
		salesFunnelLoading,
	} = loading || {};

	const onChange = (val:string, name:string) => {
		setFilterValue((p) => ({ ...p, [name]: val }));
	};

	return (
		<div>
			<div className={styles.entity_container}>

				<div className={styles.styled_text}>Entity Code</div>
				<div className={styles.input}>
					<AsyncSelect
						name="business_name"
						asyncKey="list_cogo_entity"
						valueKey="entity_code"
						initialCall
						onChange={(userId:string) => onChange(userId, 'entityCode')}
						value={filterValue.entityCode}
						placeholder="Select Entity Code"
						size="sm"
					/>
				</div>
			</div>
			<DateAndAccount outstandingData={outstandingData} outstandingLoading={outstandingLoading} />
			<ServiceCard outstandingData={outstandingData} outstandingLoading={outstandingLoading} />
			<div className={styles.filter_container}>
				<div style={{ display: 'flex', marginBottom: '12px' }}>
					<div className={styles.input}>
						<Select
							value={filterValue.serviceType}
							onChange={(val:string) => onChange(val, 'serviceType')}
							placeholder="Service Type"
							options={SHIPMENT_TYPE_OPTIONS}
							isClearable
						/>
					</div>
					<div>
						<SegmentedControl
							options={SERVICE_PROVIDER}
							activeTab={filterValue.companyType}
							setActiveTab={(val:string) => (
								setFilterValue({ ...filterValue, companyType: val }))}
							background="#FFFAEB"
							color="#ED3726"
						/>
					</div>
				</div>
				<div style={{ display: 'flex' }}>
					<div style={{ width: '60%' }}>
						<OutstandingAge
							data={outstandingAgeData}
							loading={
							outstandingAgeLoading
                            }
						/>
						<OutStandingKam
							kamOutstandingData={kamOutstandingData}
							kamOutstandingLoading={kamOutstandingLoading}

						/>
					</div>

					<SalesFunnel
						salesFunnelMonth={salesFunnelMonth}
						setSalesFunnelMonth={setSalesFunnelMonth}
						salesFunnelData={salesFunnelData}
						salesFunnelLoading={salesFunnelLoading}
					/>
				</div>

			</div>
			<InvoiceJourney filterValue={filterValue} />
			<DailySales filterValue={filterValue} />
			<DailySalesOutstanding
				dailySalesOutstandingData={dailySalesOutstandingData}
				dailySalesOutstandingApiLoading={dailySalesOutstandingApiLoading}
				quaterly={quaterly}
				quaterlyLoading={quaterlyLoading}
			/>

		</div>

	);
}

export default Dashboard;
