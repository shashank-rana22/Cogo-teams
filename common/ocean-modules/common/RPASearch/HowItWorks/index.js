import Button from '@cogoport/front/components/admin/Button';

import {
	Container,
	Header,
	StyledBackButton,
	Heading,
	StyledButton,
	CancelButton,
	Text,
	Box,
	Boxes,
	StyledArrow,
	FeebBackClick,
} from './styles';

function HowItWorks({ setTask }) {
	return (
		<Container>
			<Header>
				<StyledBackButton
					onClick={() => {
						setTask('search_box');
					}}
				/>
				<Heading>HOW IT WORKS</Heading>
			</Header>
			<Text>
				We are constantly improving our systems to give you a seamless
				experience via Machine Learning and AI. RPA is reading all the documents
				which are coming at operations@cogoport.com or zoho and showing them
				here. You can search your mails by subject, name, document number or
				document name and upload them directly.
			</Text>
			<Text>
				The working of RPA (Robotic Process Automation) depends on all the mails
				that you receive at operations@cogoport.com or zoho (for maersk), Once
				mail arrives at operations the flow goes this way.
			</Text>
			<Boxes>
				<Box>RPA Read Mails (operations@cogoport.com)</Box>
				<StyledArrow />
				<Box>Classifies Mails</Box>
				<StyledArrow />
				<Box>Pass it to Cogo Lens</Box>
				<StyledArrow />
				<Box>Format mails</Box>
				<StyledArrow />
				<Box>Notify corresponding stakeholder</Box>
				<StyledArrow />
				<Box>Get visible on this Search Box</Box>
			</Boxes>

			<Text>
				<span style={{ color: 'red' }}>Important Note </span>
				-&gt; Don&apos;t
				miss out on automations and waste your time checking emails for docs and
				other stuff to update them on the platform, you might be having other
				email ids upon which you are getting shipment updates other than
				operations@cogoport.com. Please let us know in
				{' '}
				<FeebBackClick onClick={() => setTask('feed_back')}>
					feedback
				</FeebBackClick>
				{' '}
				section and leave the rest to us in automating tasks, invoices, shipment
				updates for all the shipments going on at the Cogoport platform. None of
				your personal mails will be exposed only the ones you will provide
				access to will be read. In
				{' '}
				<FeebBackClick onClick={() => setTask('feed_back')}>
					feedback
				</FeebBackClick>
				{' '}
				section just provide your email and we will automate all your shipment
				journey. You just sit back and relax
			</Text>

			<StyledButton>
				<CancelButton>
					<Button
						className="secondary md"
						onClick={() => {
							setTask('search_box');
						}}
					>
						Cancel
					</Button>
				</CancelButton>
			</StyledButton>
		</Container>
	);
}

export default HowItWorks;
