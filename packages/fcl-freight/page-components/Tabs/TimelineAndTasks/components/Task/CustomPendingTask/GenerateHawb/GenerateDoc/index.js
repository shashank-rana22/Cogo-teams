import { Button } from '@cogoport/front/components/admin';
import { useEffect } from 'react';
import {
	Container,
	FileContainer,
	LoadingContainer,
	ButtonDiv,
	BtnDiv,
} from './styles.js';
import useGenerateDocument from './useGenerateDocument.js';
import GenerateHawbDoc from './GenerateHawbDoc';

const GenerateDoc = ({
	shipment_data,
	task,
	refetch,
	clearTask,
	setIsGenerated = () => {},
	isGenerated,
}) => {
	const {
		documentList,
		pendingTaskLoading,
		documentLoading,
		generateLoading,
		certificateData,
		completeTask,
		generateCertificate,
		generateData,
	} = useGenerateDocument({
		shipment_data,
		task,
		refetch,
		clearTask,
	});
	useEffect(() => {
		if (certificateData?.id) {
			setIsGenerated(true);
		}
	}, [certificateData]);

	return (
		<Container>
			<ButtonDiv>
				{!isGenerated ? (
					<Button
						onClick={() => {
							generateCertificate();
						}}
						disabled
					>
						Generate HAWB Freight Certificate
					</Button>
				) : null}
			</ButtonDiv>
			{documentLoading || generateLoading ? (
				<LoadingContainer>Generating ...</LoadingContainer>
			) : null}
			<FileContainer>
				{generateData && (
					<GenerateHawbDoc
						generateData={generateData}
						shipment_data={shipment_data}
						completeTask={completeTask}
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
