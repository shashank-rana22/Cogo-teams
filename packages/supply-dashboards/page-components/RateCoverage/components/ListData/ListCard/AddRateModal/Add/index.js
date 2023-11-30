import { Button, Modal, Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

import Layout from '../../../../../../RfqEnquiries/Layout';
import { DEFAULT_VALUE } from '../../../../../configurations/helpers/constants';
import AddAdditionalRates from '../../AddRate/AddAdditionalRate';
import ServiceDetailsContent from '../../DetailsView/Content';
import SelectLocalCharges from '../../LocalCharges';
import styles from '../styles.module.css';

function AddRate({
	showModal = false,
	setShowModal = () => {}, setServiceIdPresent = () => {}, getListCoverage = () => {}, activeTab = {},
	source = {},
	shipment_data = {},
	requestData = [],
	feedbackData = [],
	shipment_loading = false,
	request_loading = false,
	feedback_loading = false,
	addLocalServices = {},
	showElements = {},
	setActiveTab = () => {},
	finalFields = {},
	control = [],
	handleSubmit = () => {},
	loading = false,
	errors = {},
	handleSubmitData = () => {},
	payload = {},
	data = {},
	spot_data = {},
	dependentMainFreight = [],
	filter = {},
	getStats = () => {},
	triggeredFrom = '',
	values = {},
	portValue = {},
	setPortValue = () => {},
	storeLocalImportData = {},
	setStoreLocalImportData = () => {},
	storeLocalExportData = {},
	setStoreLocalExportData = () => {},
}) {
	const onCloseHandel = () => {
		setShowModal((prev) => !prev);
		setServiceIdPresent('');
		if (activeTab) {
			getStats();
			getListCoverage();
		}
	};
	return (
		<Modal
			show={showModal}
			onClose={onCloseHandel}
			placement="top"
			size="xl"
		>
			<div>
				{['live_booking', 'rate_feedback', 'rate_request']?.includes(source)
			&& (
				<div className={styles.service_content}>
					<ServiceDetailsContent
						shipment_data={shipment_data}
						requestData={requestData?.list?.[DEFAULT_VALUE] || null}
						feedbackData={feedbackData?.list?.[DEFAULT_VALUE] || null}
						shipment_loading={shipment_loading}
						request_loading={request_loading}
						feedback_loading={feedback_loading}
						data={data}
						filter={filter}
						source={source}
					/>
				</div>
			)}
			</div>

			<div className={!addLocalServices ? styles.local : ''}>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
					style={{ padding: '10px 0 0' }}
				>

					<TabPanel
						name="main_freight"
						title={addLocalServices && 'ADD MAIN FREIGHT RATE'}
					>
						<Modal.Body>
							<div className={styles.title}>Please Add Rate</div>
							<Layout
								fields={finalFields}
								control={control}
								errors={errors}
								showElements={showElements}
								source={source}
							/>
							{filter?.service === 'fcl_freight'
						&& (
							<SelectLocalCharges
								data={data}
								values={values}
								portValue={portValue}
								setPortValue={setPortValue}
								storeLocalImportData={storeLocalImportData}
								setStoreLocalImportData={setStoreLocalImportData}
								storeLocalExportData={storeLocalExportData}
								setStoreLocalExportData={setStoreLocalExportData}
							/>
						)}
						</Modal.Body>
						<Modal.Footer>
							<div className={styles.submit_button}>
								<Button
									size="md"
									onClick={() => {
										setShowModal((prev) => !prev);
										setServiceIdPresent('');
									}}
									style={{ marginRight: '20px' }}
									themeType="secondary"
								>
									Close
								</Button>
								<Button
									size="md"
									onClick={handleSubmit(handleSubmitData)}
									disabled={loading}
								>
									Submit
								</Button>
							</div>
						</Modal.Footer>
					</TabPanel>
					{addLocalServices && (
						<TabPanel name="additional_freight" title="ADD OTHER SERVICES RATES">
							<Modal.Body>
								<AddAdditionalRates
									payload={payload}
									data={data}
									additionalService={spot_data?.service_details}
									dependentMainFreight={dependentMainFreight}
									filter={filter}
									source={source}
									triggeredFrom={triggeredFrom}
								/>
							</Modal.Body>
							<Modal.Footer>
								<Button
									size="md"
									onClick={onCloseHandel}
									style={{ marginRight: '20px' }}
									themeType="secondary"
								>
									Close
								</Button>
							</Modal.Footer>
						</TabPanel>
					)}

				</Tabs>
			</div>
		</Modal>
	);
}

export default AddRate;
