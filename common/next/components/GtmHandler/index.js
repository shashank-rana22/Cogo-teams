/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-danger */
function GTM({ gtmId }) {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `
			<!-- Google Tag Manager -->
			(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','${gtmId}');
			<!-- End Google Tag Manager -->
		`,
			}}
		/>
	);
}

function GTMNoScript({ gtmId }) {
	return (
		<noscript>
			<iframe
				src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
				height="0"
				width="0"
				style={{ display: 'none', visibility: 'hidden' }}
			/>
		</noscript>
	);
}

GTM.NoScript = GTMNoScript;

export default GTM;
