import React, { forwardRef, useRef, useState } from 'react';
import { TradeDocTemplate } from '@cogo/business-modules/components/trade-documents';
import { Flex, FullscreenModal, Text } from '@cogo/commons/components';
import { Button } from '@cogoport/front/components/admin';

const Create = ({
	onSave = () => {},
	createData,
	completed = false,
	summary = {},
	services = [],
	loading = false,
	requiredTasks = [],
}) => {
	const [show, setShow] = useState(false);
	const [mode, setMode] = useState('write');
	const ref = useRef();

	const air_service =
		(services || []).find(
			(service) => service?.service_type === 'air_freight_service',
		) || {};

	const templateInitialValues = {
		...summary,
		...air_service,
		...createData,
	};

	const handleSave = () => {
		ref?.current?.submit().then(onSave);
	};

	const handleContent = () => {
		if (requiredTasks?.length < 2) {
			return <Text>Complete Upload Draft Airway Bill task first.</Text>;
		}
		if (completed) {
			return (
				<Flex display="block">
					<Text marginBottom={8}>
						Draft is already uploaded, you can preview it here
					</Text>
					<Button
						ghost={!!createData}
						onClick={() => {
							setShow(true);
							setMode('read');
						}}
						id="bm_pt_view_manifest_copy_btn"
						size="sm"
					>
						View
					</Button>
				</Flex>
			);
		}
		if (!completed && requiredTasks?.length >= 2) {
			return (
				<Flex display="block">
					<Text marginBottom={8}>
						Click the following button to create a new draft
					</Text>
					<Button
						ghost={!!createData}
						onClick={() => setShow(true)}
						size="sm"
						id="bm_pt_draf_hbl_create_btn"
						disabled={loading}
					>
						{createData ? 'Edit the draft' : 'Create a new draft'}
					</Button>
				</Flex>
			);
		}
		return null;
	};

	return (
		<div>
			{handleContent()}

			<FullscreenModal
				heading="Air Cargo Manifest"
				headerActions={
					!completed ? (
						<>
							<Button
								style={{ marginLeft: 8 }}
								onClick={handleSave}
								size="sm"
								id="bm_pt_cargo_manifest_save_btn"
							>
								Save
							</Button>
						</>
					) : null
				}
				show={show}
				setShow={setShow}
			>
				<Flex
					style={{ overflow: 'auto' }}
					bgColor="#E0E0E0"
					padding={16}
					justifyContent="center"
				>
					<TradeDocTemplate
						ref={ref}
						mode={mode}
						documentType="manifest_copy"
						initialValues={templateInitialValues}
						summary={summary}
					/>
				</Flex>
			</FullscreenModal>
		</div>
	);
};

export default forwardRef(Create);
