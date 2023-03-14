import React, { useRef } from 'react';
import { Button, Loader } from '@cogoport/front/components/admin';
import useGetImageSource from '../hooks/useGetImageSource';
import useGeneratePdf from '../hooks/useGeneratePdf';
import { indentRows } from '../configs/indentDocumentRows';
import { indentStyles } from '../utils/indentStyles';
import { Container, Header, ButtonWrapper, LoadingStyle } from './styles';

const imageURL =
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/1c989c0ffa90bbdfe2bddbfacc7cb9b3/concor-logo.png';

function ModalContent({
	showModal = false,
	setShowModal = () => {},
	services = [],
	setIndentURL = () => {},
}) {
	const finalRows = indentRows(services);

	const { imageSource } = useGetImageSource({ imageURL });

	const { loading, generatePdf } = useGeneratePdf();

	const ref = useRef(null);

	const callback = (response) => {
		setIndentURL(response?.data?.pdf_url);
		setShowModal(!showModal);
	};

	const generateIndent = () => {
		const html = `<html><head><style>${indentStyles}</style></head><body>${ref.current?.innerHTML}</body></html>`;

		generatePdf({ html, scale: 0.6, callback });
	};

	return (
		<Container>
			{loading && (
				<LoadingStyle>
					<Loader />
				</LoadingStyle>
			)}
			<Header>Indent Document</Header>
			<div ref={ref}>
				<div className="container">
					<div className="header">
						<div className="box">
							<img className="logo" src={imageSource} alt="concor-logo" />
						</div>
						<div className="sub-header">
							<h3 className="heading">
								Container Corporation of India Limited
							</h3>
							<h5 className="sub-heading">
								(A government of India Undertaking)
							</h5>
							<h5 className="address">
								Multi Modal Logistics Park, Atal Nagar, Naya Raipur,
								Chhattisgarh - 492101
							</h5>
						</div>
						<div className="box date-box">
							<div className="single-input">
								<div className="input key">Indent No. :</div>
								<div className="input line" />
							</div>
							<div className="single-input">
								<div className="input key">Date :</div>
								<div className="input line" />
							</div>
						</div>
					</div>
					<div className="upper-container">
						<h3 className="upper-container-heading">
							Indent Note For Domestic Container
						</h3>
					</div>
					<div className="content-container">
						{finalRows.map((item) => (
							<div className="single-content">
								<div className={`input key ${item.isSubType ? 'end' : ''}`}>
									{item.key}
								</div>
								<div className="colon">{!item.isMain ? ':' : ''}</div>
								<div className={`input ${item.className}`}>
									{item.value}{' '}
									{item?.className === 'empty-box' && (
										<div className="empty-box-entry">{item.boxValue}</div>
									)}
								</div>
							</div>
						))}

						<div className="footer">
							<div className="footer-left">
								<span>Concor :</span>
								<span>Date :</span>
							</div>
							<div className="footer-right">
								<span>Agent&apos;s Signature</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ButtonWrapper>
				<Button className="primary md" onClick={() => generateIndent()}>
					Upload Indent
				</Button>
			</ButtonWrapper>
		</Container>
	);
}

export default ModalContent;
