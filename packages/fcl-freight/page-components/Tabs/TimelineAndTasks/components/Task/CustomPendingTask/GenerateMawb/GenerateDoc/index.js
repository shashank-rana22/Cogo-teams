import React, { useEffect, useState } from 'react';
import { Button } from '@cogoport/front/components/admin';
import { Loader } from '@cogoport/front/components';
import Layout from '@cogo/business-modules/form/Layout';
import { useFormCogo } from '@cogoport/front/hooks';
import useGenerateDocument from './useGenerateDocument';
import GenerateMawbDoc from './GenerateMawbDoc';
import mawbControls from './mawbControls';
import {
	Container,
	FileContainer,
	ButtonDiv,
	BtnDiv,
	EmptyContainer,
	LayoutContainer,
} from './styles.js';

const GenerateDoc = ({
	shipment_data = {},
	task = '',
	refetch = () => {},
	clearTask = () => {},
	setIsGenerated = () => {},
	viewDoc = false,
	details = {},
	isAmended = false,
	setIsAmended = () => {},
	primary_service = {},
}) => {
	const {
		documentList,
		pendingTaskLoading,
		documentLoading,
		generateLoading,
		certificateData,
		completeTask,
		generateCertificate,
	} = useGenerateDocument({
		shipment_data,
		task,
		refetch,
		clearTask,
	});
	const [back, setBack] = useState(false);

	const {
		fields,
		handleSubmit,
		watch,
		setValue,
		setValues,
		formState: { errors },
	} = useFormCogo(mawbControls());
	const packages_details = [];
	if (!isAmended) {
		const { packages = [] } = primary_service;
		if (packages?.length === 0) {
			packages_details.push({
				length: '',
				width: '',
				height: '',
				packages: '',
			});
		}
		(packages || []).forEach((pack) => {
			packages_details.push({
				length: pack?.length,
				width: pack?.width,
				height: pack?.height,
				packages: pack?.packages_count,
			});
		});
	}

	const data = details.data ? JSON.parse(details?.data) : {};
	const keys = Object.keys(data);

	useEffect(() => {
		setValues({
			origin_airport: primary_service?.origin_airport?.name,
			destination_airport: primary_service?.destination_airport?.name,
			dimension: packages_details,
		});
		keys.map((item) => setValue(`${item}`, data[item]));
	}, []);

	const formValues = watch();

	const form_data = {
		agent_name: primary_service
			? `${primary_service?.service_provider?.business_name}`
			: null,
		...formValues,
	};

	useEffect(() => {
		if (certificateData?.id) {
			setIsGenerated(true);
		}
	}, [certificateData]);
	useEffect(() => {
		if (viewDoc) generateCertificate();
	}, [viewDoc]);
	if (generateLoading)
		return (
			<EmptyContainer>
				<Loader />
			</EmptyContainer>
		);
	const onSubmit = () => {
		generateCertificate();
		setBack(true);
	};
	return (
		<Container>
			{!viewDoc && !back && (
				<LayoutContainer>
					<Layout
						fields={fields}
						errors={errors}
						controls={mawbControls()}
						themeType="admin"
					/>
				</LayoutContainer>
			)}
			{!viewDoc && (
				<ButtonDiv>
					{!back ? (
						<Button
							onClick={handleSubmit(onSubmit)}
							disabled={documentLoading || generateLoading}
						>
							{documentLoading || generateLoading
								? 'Generating'
								: 'Generate Master Airway Bill'}
						</Button>
					) : null}
				</ButtonDiv>
			)}
			<FileContainer>
				{(back || viewDoc) && (
					<GenerateMawbDoc
						shipment_data={shipment_data}
						completeTask={completeTask}
						task={task}
						viewDoc={viewDoc}
						details={details}
						setIsAmended={setIsAmended}
						isAmended={isAmended}
						formData={form_data}
						setBack={setBack}
						back={back}
						primary_service={primary_service}
					/>
				)}
			</FileContainer>
			{documentList?.[0]?.document_url ? (
				<BtnDiv>
					<Button
						onClick={() => {
							completeTask();
						}}
						disabled={pendingTaskLoading}
					>
						Submit
					</Button>
				</BtnDiv>
			) : null}
		</Container>
	);
};

export default GenerateDoc;
