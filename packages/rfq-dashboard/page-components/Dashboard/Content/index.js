import { Pagination, Tabs, TabPanel, Modal, Button, Placeholder } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMSettings } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import useListPlatformConfigConstants from '../../../hooks/useListPlatformConfigConstants';
import useListRfqs from '../../../hooks/useListRfqs';
import useUpdateMarginValue from '../../../hooks/useUpdateMarginValue';
import { getFieldController } from '../../../utils/getFieldController';
import getControls from '../../../utils/getSettingContols';

import RfqDetails from './RfqDetails';
import styles from './styles.module.css';

const TAB_MAPPING = [
	{ name: 'approval', title: 'Approval' },
];

const ICON_SIZE = 25;
const DEFAULT_PAGE_SIZE = 0;
const DEFAULT_TOTAL_ITEM = 0;
const DEFAULT_CURRENT_PAGE = 1;

function Content(props) {
	const { activeTab, setActiveTab, filterStore } = props;
	const [showModal, setShowModal] = useState(false);
	const { control, getValues, setValue } = useForm();

	const { getRfqsForApproval, data = {}, page, setPage, loading } = useListRfqs({ filterStore });

	const {
		listPlatformConfigConstants,
		data : platformData,
		loading:platformLoading,
	} = useListPlatformConfigConstants({ setValue });

	const {
		updateMarginValue,
		loading : updateLoading,
	} = useUpdateMarginValue();

	useEffect(() => {
		getRfqsForApproval();
	}, [getRfqsForApproval, filterStore]);

	const { list = [] } = data;
	const controls = getControls();

	const handleProfitability = () => {
		const profitability = getValues('minimum_profitability');

		const id = platformData?.list?.[DEFAULT_PAGE_SIZE]
			?.platform_config_constant_mappings?.[DEFAULT_PAGE_SIZE]?.id;

		const payload = {
			id,
			value_type : 'default',
			key_value  : profitability,

		};

		updateMarginValue({ payload });
		setShowModal(false);
	};

	const handleSettings = () => {
		listPlatformConfigConstants();
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

	return (
		<div>
			<div className={styles.container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					{TAB_MAPPING.map(({ name, title }) => (
						<TabPanel name={name} title={title} key={name}>
							<RfqDetails
								{...props}
								list={list}
								loading={loading}
								getRfqsForApproval={getRfqsForApproval}
							/>
						</TabPanel>
					))}
				</Tabs>

				<div className={styles.settings}>
					<IcMSettings
						onClick={() => {
							handleSettings();
						}}
						width={ICON_SIZE}
						height={ICON_SIZE}
					/>
					<Modal size="sm" show={showModal} onClose={handleModalClose}>
						<Modal.Header title="Setting" />
						<Modal.Body>
							Set the Threshold Margin Percentage for auto approval
							<div>
								{!platformLoading
									? controls.map((controlData) => {
										const { type, name, arrow, style, placeholder, suffix, rules } = controlData;
										const Element = getFieldController(type);
										return (
											<Element
												key={name}
												control={control}
												name={name}
												style={style}
												placeholder={placeholder}
												arrow={arrow}
												suffix={suffix}
												rules={rules}
											/>
										);
									}) : <Placeholder width="200px" height="40px" margin="4px" />}
							</div>

							<div className={styles.button}>
								<Button onClick={handleModalClose} themeType="tertiary">
									Cancel
								</Button>

								<Button
									onClick={handleProfitability}
									themeType="accent"
									loading={updateLoading}
									disabled={updateLoading}
								>
									Save

								</Button>
							</div>

						</Modal.Body>
					</Modal>
				</div>

			</div>

			{!loading && (
				<div className={styles.pagination_container}>
					<Pagination
						className="md"
						totalItems={data?.total_count || DEFAULT_TOTAL_ITEM}
						currentPage={page || DEFAULT_CURRENT_PAGE}
						pageSize={data?.page_limit || DEFAULT_PAGE_SIZE}
						onPageChange={setPage}
						type="table"
					/>
				</div>
			)}
		</div>
	);
}

export default Content;
