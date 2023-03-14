import React, { useState } from 'react';
import { Button } from '@cogoport/front/components/admin';
import startCase from '@cogo/utils/startCase';
import { Container, Row, Main } from './styles.js';
import UploadDoc from './UploadDoc/index.js';
import GenerateDoc from './GenerateDoc/index.js';

const GenerateHawb = ({
	pendingTask,
	summary,
	refetch = () => {},
	clearTask = () => {},
}) => {
	const [toggle, setToggle] = useState('switch_to_generate');
	const [isGenerated, setIsGenerated] = useState(false);

	const componentToRender = {
		switch_to_generate: (
			<GenerateDoc
				shipment_data={summary}
				task={pendingTask}
				refetch={refetch}
				clearTask={clearTask}
				setIsGenerated={setIsGenerated}
				isGenerated={isGenerated}
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

export default GenerateHawb;
