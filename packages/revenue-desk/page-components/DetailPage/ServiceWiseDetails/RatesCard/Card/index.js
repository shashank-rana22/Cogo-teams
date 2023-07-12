import { Pill } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import Footer from './Footer';
import PriorityNumber from './PriorityNumber';
import styles from './styles.module.css';

function Card({
	data, setPrefrences, prefrences, rate_key, singleServiceData, setSellRates,
	sellRates, prefrence_key, fromkey, priority_no, shipmentData,
}) {
	const handlePrefrence = (rate) => {
		const foundItem = (prefrences?.[singleServiceData?.id] || []).find(
			(obj) => obj?.validity_id === rate?.rowData?.validity_id
			&& obj?.rate_id === rate?.id,
		);
		if (foundItem) {
			const oldItems = prefrences?.[singleServiceData?.id];
			const newRows = oldItems.filter((val) => {
				if (rate?.rowData?.validity_id) {
					return val?.validity_id !== rate?.rowData?.validity_id
					&& val?.rate_id !== rate?.id;
				}

				return val?.rate_id !== rate?.id;
			});

			if (newRows?.length) {
				setPrefrences({ ...prefrences, [singleServiceData?.id]: [...newRows] });
			} else {
				setPrefrences({ ...prefrences, [singleServiceData?.id]: [] });
			}
		} else {
			const newList = prefrences?.[singleServiceData?.id] || [];
			newList.push({
				rate_id     : rate?.id,
				id          : rate?.rowData?.service_provider_id,
				key         : prefrence_key,
				data        : rate,
				validity_id : rate?.rowData?.validity_id,
			});
			setPrefrences({ ...prefrences, [singleServiceData?.id]: [...newList] });
		}
	};
	const showData = (val) => val || '';
	const updated_at = data?.rowData?.updated_at;

	const handleLeftSectionPriority = (ratekey) => {
		if (ratekey === 'selected_rate') {
			return `${priority_no}.`;
		} if (ratekey === 'preferences_rate') {
			return `${data?.rowData?.priority}.`;
		} if (ratekey === 'not_preferences_rate') {
			return <IcMOverflowDot />;
		}
		return (
			<PriorityNumber
				data={prefrences?.[singleServiceData?.id]}
				id={data?.id}
				showPriority
				validity_id={data?.rowData?.validity_id}
			/>
		);
	};
	return (
		<div
			className={((rate_key === 'selected_rate') || (rate_key === 'preferences_rate'))
				? styles.selected_rate_card_container : styles.container}
			role="presentation"
			onClick={() => (!rate_key ? handlePrefrence(data) : null)}
		>
			<div className={styles.left_section_container}>
				{handleLeftSectionPriority(rate_key)}
			</div>
			<div className={styles.line} />
			<div className={styles.right_section_container}>
				<div className={styles.upper_section}>
					<div className={styles.upper_left_section}>
						<div className={styles.service_provider_heading}>
							{showData(data?.rowData?.service_provider?.business_name)}
						</div>
						<div>
							{singleServiceData?.service_type === 'air_freight_service'
								? showData(data?.rowData?.air_line)
								: showData(data?.rowData?.shipping_line)}
						</div>
						<div>
							{updated_at ? (
								<div className={styles.updated_at}>
									Last updated :
									{format(updated_at, 'dd MMM yy')}
								</div>
							) : null}
						</div>
						<div className={styles.source}>
							{
							data?.rowData?.mode ? (
								<div>
									<Pill size="md" color="#FEF3E9">{data?.rowData?.mode}</Pill>
								</div>
							) : null
							}
						</div>
						<div className={styles.source}>
							{
							data?.rowData?.shipment_type ? (
								<div>
									<Pill size="md" color="#FEF3E9">{data?.rowData?.shipment_type}</Pill>
								</div>
							) : null
							}
						</div>
						{
							data?.rowData?.schedule_type ? (
								<div>
									<Pill size="md" color="#F2F3FA">{data?.rowData?.schedule_type}</Pill>
								</div>
							) : null
						}
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						{rate_key
							? (
								<div>
									<Pill size="md" color="#F2F3FA">
										{startCase(fromkey || data?.rowData?.source)}
									</Pill>
								</div>
							) : null}
						{((data?.rowData?.selected_priority)
						&& (data?.rowData?.selected_priority === data?.rowData?.priority)) ? (
							<div>
								<Pill size="md" color="#F9F9F9">
									<div style={{ color: '#7278AD' }}>
										So1 Selected Rate
									</div>

								</Pill>
							</div>
							) : null}
						{
							data?.rowData?.agent ? (
								<div>
									Supply Agent :
									{' '}
									{data?.rowData?.agent}
								</div>
							) : null
						}
					</div>
				</div>
				<div>
					<Footer
						data={data}
						shipmentData={shipmentData}
						singleServiceData={singleServiceData}
						setSellRates={setSellRates}
						sellRates={sellRates}
						prefrence_key={prefrence_key}
					/>
				</div>

			</div>
		</div>

	);
}

export default Card;
