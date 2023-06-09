import { Pagination, Tabs, TabPanel, Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMSettings } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import useListPlatformConfigConstants from '../../../hooks/useListPlatformConfigConstants';
import useListRfqs from '../../../hooks/useListRfqs';
import useUpdatePlatformConfigMapping from '../../../hooks/useUpdatePlatformConfigMapping';
import { getFieldController } from '../../../utils/getFieldController';
import getControls from '../../../utils/getSettingContols';

import RfqDetails from './RfqDetails';
import styles from './styles.module.css';

const TAB_MAPPING = [
	{ name: 'approval', title: 'Approval' },
];
const INITIAL_ELEMENT = 0;

function Content(props) {
	const { activeTab, setActiveTab, filterStore } = props;
	const [showModal, setShowModal] = useState(false);
	const { control, getValues, setValue } = useForm();

	const { getRfqsForApproval, data = {}, page, setPage, loading } = useListRfqs({ filterStore });
	const {
		listPlatformConfigConstants,
		data : platformData, loading : platformLoading,
	} = useListPlatformConfigConstants({ setValue });

	const {
		updatePlatformConfigMapping,
		loading : updateLoading,
	} = useUpdatePlatformConfigMapping();

	useEffect(() => {
		getRfqsForApproval();
	}, [getRfqsForApproval, filterStore]);

	const { list = [] } = data;
	const controls = getControls();

	const handleProfitability = () => {
		const profitability = getValues('minimum_profitability');

		const id = platformData?.list?.[INITIAL_ELEMENT]
			.platform_config_constant_mappings?.[INITIAL_ELEMENT]?.id;

		const payload = {
			id,
			value_type : 'default',
			value_hash : {
				key_value: profitability,
			},
		};
		updatePlatformConfigMapping({ payload });
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
							listPlatformConfigConstants();
							setShowModal(true);
						}}
						width="25px"
						height="25px"
					/>
					<Modal size="sm" show={showModal} onClose={() => setShowModal(false)}>
						<Modal.Header title="Setting" />
						<Modal.Body>
							Set the Threshold Margin Percentage for auto approval
							<div>
								{
									controls.map((controlData) => {
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
									})
								}
							</div>
							<div className={styles.button}>
								<Button onClick={() => setShowModal(false)} themeType="tertiary">
									Cancel
								</Button>

								<Button
									onClick={handleProfitability}
									themeType="accent"
									loading={platformLoading || updateLoading}
									disabled={platformLoading || updateLoading}
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
						totalItems={data?.total_count || INITIAL_ELEMENT}
						currentPage={page || 1}
						pageSize={data?.page_limit || INITIAL_ELEMENT}
						onPageChange={setPage}
						type="table"
					/>
				</div>
			)}
		</div>
	);
}

export default Content;
