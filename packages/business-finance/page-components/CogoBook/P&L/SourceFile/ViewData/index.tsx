import { Breadcrumb, Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Link, useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';
import { useEffect, useMemo, useState } from 'react';

import useDeleteView from '../../../hooks/useDeleteView';
import useReport from '../../../hooks/useReport';
import {
	getAirRatio, getAllShipment,
	getColumnView, getOceanRatio,
	getRailRatio, getSurfaceRatio,
} from '../UploadReport/contant';

import styles from './styles.module.css';

function ViewData() {
	const { query, push } = useRouter();
	const [dropDownData, setDropDownData] = useState({});
	const [getRatio, setGetRatio] = useState({
		air          : '',
		airCustoms   : '',
		airExports   : '',
		airImports   : '',
		fclExports   : '',
		fclImports   : '',
		ftl          : '',
		lclExports   : '',
		lclImports   : '',
		ltl          : '',
		ocean        : '',
		oceanCustoms : '',
		rail         : '',
		railDomestic : '',
		surface      : '',
	});

	const { entity, month, id, name, date } = query || {};
	const formatMonth = format(Number(month), 'MMM yyyy');
	const monthPayload = format(Number(month), 'yyyy-MM-01');
	const entityMapping = {
		'6fd98605-9d5d-479d-9fac-cf905d292b88' : 101,
		'c7e1390d-ec41-477f-964b-55423ee84700' : 201,
		'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1' : 301,
		'04bd1037-c110-4aad-8ecc-fc43e9d4069d' : 401,
		'b67d40b1-616c-4471-b77b-de52b4c9f2ff' : 501,
	};
	const formatDate = format(Number(date), 'dd MMM yyyy');
	const { fetchRatioApi, ratiosData } = useReport({ monthPayload });
	const {
		air = '', airCustoms = '',
		airExports = '', airImports = '',
		fclExports = '', fclImports = '', ftl = '', lclExports = '',
		lclImports = '', ltl = '', ocean = '', oceanCustoms = '', rail = '',
		railDomestic = '', surface = '',
	} = getRatio || {};

	const oceanData = useMemo(() => getOceanRatio(
		ocean,
		oceanCustoms,
		fclImports,
		fclExports,
		lclImports,
		lclExports,
	), [fclExports, fclImports, lclExports, lclImports, ocean, oceanCustoms]);
	const airData = useMemo(() => getAirRatio(
		air,
		airCustoms,
		airExports,
		airImports,
	), [air, airCustoms, airExports, airImports]);
	const surfaceData = useMemo(() => getSurfaceRatio(
		surface,
		ftl,
		ltl,
	), [ftl, ltl, surface]);
	const railData = useMemo(() => getRailRatio(
		rail,
		railDomestic,
	), [rail, railDomestic]);

	const handleDropdown = (key = '', dataKey = '') => {
		setDropDownData((previousActions) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));

		const ratioDataValue = (ratiosData?.list || [{}])?.find((itemRatio) => itemRatio.ratioBasis === dataKey);

		setGetRatio(ratioDataValue?.turnoverRatioDetails);
	};
	const { refetch, deleteLoading } = useDeleteView();

	const handlePush = () => {
		push(
			'/business-finance/cogo-book/pl_statement',
			'/business-finance/cogo-book/pl_statement',
		);
	};

	useEffect(() => { fetchRatioApi(); }, [fetchRatioApi]);

	return (
		<div>
			<div>
				<Breadcrumb>
					<Breadcrumb.Item
						label={(
							<Link
								href="/business-finance/cogo-book/pl_statement"
							>
								<div className={styles.title_item}>P&L Statement</div>
							</Link>
						)}
					/>
					<Breadcrumb.Item label="Report View" />
				</Breadcrumb>
			</div>

			<div className={styles.main_icon} onClick={() => { handlePush(); }} role="presentation">
				<div className={styles.back_icon}>
					<IcMArrowBack height="15px" width="15px" />
				</div>

				<div className={styles.title}>P&L Statement</div>
			</div>
			<div className={styles.card_value}>
				<div>
					#Upload_
					{id}
				</div>

				<div>
					Upload Month -
					{' '}
					{formatMonth}
				</div>

				<div className={styles.name_data}>
					<div>
						Uploaded By -
						{' '}
						{name}
					</div>
					<div className={styles.date_data}>
						{formatDate}
					</div>
				</div>

				<div className={styles.basis}>
					Entity :
					{' '}
					{entityMapping[entity] }
				</div>

				<div>
					<Button
						themeType="secondary"
						onClick={() => { refetch(); }}
						loading={deleteLoading}
					>
						Delete
					</Button>

				</div>
			</div>
			<div>
				{' '}
				{ getColumnView.map((item) => {
					const {
						label = '', id:idDataValue = '', iconInfo, iconArrowUp, iconArrowDown,
						dataKey = '',
					} = item || {};
					return (
						<div className={styles.card}>
							<div
								className={dropDownData[idDataValue] ? styles.card_data_enter : styles.card_data}
								onClick={() => { handleDropdown(idDataValue, dataKey); }}
								role="presentation"
							>
								<div className={styles.flex_header}>
									<div>{label}</div>

									<div className={styles.icon_info}>{iconInfo}</div>

								</div>

								<div className={styles.icon}>
									{dropDownData[idDataValue]
										? iconArrowUp : iconArrowDown}

								</div>

							</div>
							{dropDownData[idDataValue] && idDataValue === '1' && (
								<div className={styles.data_value}>
									{getAllShipment.map((itemShipment) => {
										const { label:labelData = '' } = itemShipment || {};

										return (
											<div className={styles.shipment_container}>
												<div className={styles.header}>
													<div>{labelData}</div>
												</div>

												<div className={styles.shipment_data}>
													{labelData === 'Ocean' && (
														<div className={styles.ocean}>
															{oceanData.map((valOcean) => (

																<div>
																	<div className={styles.name}>
																		{valOcean?.name}
																	</div>
																	<div className={styles.value}>
																		{valOcean?.value}
																	</div>
																</div>

															))}
														</div>

													)}

													{labelData === 'Air' && 	(
														<div className={styles.ocean}>
															{airData.map((val) => (

																<div>
																	<div className={styles.name}>
																		{val?.name}
																	</div>
																	<div className={styles.value}>
																		{val?.value}

																	</div>
																</div>

															))}
														</div>
													)}

													{labelData === 'Surface' && 	(
														<div className={styles.ocean}>
															{surfaceData.map((val) => (

																<div>
																	<div className={styles.name}>
																		{val?.name}
																	</div>
																	<div className={styles.value}>
																		{val?.value}
																	</div>
																</div>

															))}
														</div>
													)}

													{labelData === 'Rail' && 	(
														<div className={styles.ocean}>
															{railData.map((val) => (

																<div>
																	<div className={styles.name}>
																		{val?.name}
																	</div>
																	<div className={styles.value}>
																		{val?.value}
																	</div>
																</div>

															))}
														</div>
													)}
												</div>
											</div>
										);
									})}
								</div>
							)}

							{dropDownData[idDataValue] && idDataValue === '2' && (
								<div className={styles.data_value}>
									{getAllShipment.map((itemShipment) => {
										const { label:labelValue = '' } = itemShipment;

										return (
											<div className={styles.shipment_container}>
												<div className={styles.header}>
													<div>{labelValue}</div>
												</div>

												<div className={styles.shipment_data}>
													{labelValue === 'Ocean' && (
														<div className={styles.ocean}>
															{oceanData.map((val) => (
																<div>
																	<div className={styles.name}>
																		{val?.name}
																	</div>
																	<div className={styles.value}>
																		{val?.value}
																	</div>
																</div>

															))}
														</div>

													)}

													{labelValue === 'Air' && 	(
														<div className={styles.ocean}>
															{airData.map((val) => (

																<div>
																	<div className={styles.name}>
																		{val?.name}
																	</div>
																	<div className={styles.value}>
																		{val?.value}
																	</div>
																</div>

															))}
														</div>
													)}

													{labelValue === 'Surface' && 	(
														<div className={styles.ocean}>
															{surfaceData.map((val) => (

																<div>
																	<div className={styles.name}>
																		{val?.name}
																	</div>
																	<div className={styles.value}>
																		{val?.value}
																	</div>
																</div>

															))}
														</div>
													)}

													{labelValue === 'Rail' && 	(
														<div className={styles.ocean}>
															{railData.map((val) => (

																<div>
																	<div className={styles.name}>
																		{val?.name}
																	</div>
																	<div className={styles.value}>
																		{val?.value}
																	</div>
																</div>

															))}
														</div>
													)}

												</div>
											</div>
										);
									})}
								</div>
							)}

						</div>
					);
				})}

			</div>
		</div>
	);
}
export default ViewData;
