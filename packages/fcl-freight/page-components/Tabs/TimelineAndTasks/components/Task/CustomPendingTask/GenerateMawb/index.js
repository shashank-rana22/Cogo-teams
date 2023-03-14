import React, { useState, useEffect } from 'react';
import { Button } from '@cogoport/front/components/admin';
import startCase from '@cogo/utils/startCase';
import global from '@cogo/commons/constants/global';
import { Container, Row, Main } from './styles';
import UploadDoc from './UploadDoc';
import GenerateDoc from './GenerateDoc';

const GenerateMawb = ({
	pendingTask,
	summary,
	refetch = () => {},
	clearTask = () => {},
	isAmended,
	services = {},
	primary_service = {},
	tradeType = '',
}) => {
	const [toggle, setToggle] = useState('switch_to_generate');
	const [showButton, setShowButton] = useState(false);
	const [isGenerated, setIsGenerated] = useState(false);
	useEffect(() => {
		if (
			primary_service.service_provider_id !== global.FREIGHT_FORCE_ORG_ID ||
			tradeType !== 'export'
		) {
			setToggle('switch_to_upload');
			setShowButton(true);
		}
	}, []);

	const componentToRender = {
		switch_to_generate: (
			<GenerateDoc
				shipment_data={summary}
				task={pendingTask}
				refetch={refetch}
				clearTask={clearTask}
				setIsGenerated={setIsGenerated}
				isGenerated={isGenerated}
				isAmended={isAmended}
				services={services}
				primary_service={primary_service}
				tradeType={tradeType}
			/>
		),
		switch_to_upload: (
			<UploadDoc
				task={pendingTask}
				shipment_data={summary}
				refetch={refetch}
				clearTask={clearTask}
			/>
		),
	};

	return (
		<Container>
			<Row>
				{!isGenerated ? (
					<Button
						disabled={showButton}
						onClick={() => {
							setToggle((val) => {
								return val === 'switch_to_generate'
									? 'switch_to_upload'
									: 'switch_to_generate';
							});
						}}
						className="primary md"
					>
						{startCase(
							toggle === 'switch_to_generate'
								? 'switch_to_upload'
								: 'switch_to_generate',
						)}
					</Button>
				) : null}
			</Row>
			<Main>{componentToRender[toggle]}</Main>
		</Container>
	);
};

export default GenerateMawb;
