<script>
	/**
	 * Terms & Conditions body content (MB SMART FILTERING LLC).
	 *
	 * Intentionally hardcoded English and forced left-to-right: the Terms are a
	 * legal document kept only in English and must not be translated or
	 * mirrored, regardless of the host app's active language. The host is
	 * responsible for telling a non-English reader so — `customer-portal-svelte`
	 * does it with `LegalLanguageNotice` above this component.
	 *
	 * This component is the estate-wide single source of truth for the Terms
	 * body. It lives here rather than in an app because more than one app has to
	 * show the same document and they were already drifting: the customer portal
	 * rendered this text while the technician portal's device form linked out to
	 * a separate copy on the marketing site. Anything that needs the Terms
	 * imports this; nothing re-authors them.
	 *
	 * It takes no props and renders the body only — no title, no revision line,
	 * no chrome. Each surface frames it differently (a public page, a modal, an
	 * acceptance gate with a scroll sentinel), and the first heading is
	 * `first:mt-0`, so the gap above it belongs to whoever is introducing it.
	 *
	 * The type comes from `utils/legal.js`, which the Privacy Policy reads too —
	 * that is what keeps the two documents looking like one set.
	 */
	import { legalProse } from '../../utils/legal.js';

	const {
		body,
		paragraph,
		heading,
		emphasis,
		link,
		listOuter,
		listInner,
		listOuterDisc,
		listInnerDisc
	} = legalProse;
</script>

<div dir="ltr" class="text-left">
	<h3 id="acceptance" class={heading}>Acceptance of Terms of Service</h3>
	<p class={paragraph}>
		These Terms of Service (hereinafter also referred to as "Terms" or "Terms and Conditions")
		govern your use of our programs, software, computer services, and web, app, and device filtering
		and monitoring services as they are currently constituted or as they may be updated or
		reconfigured in the future (hereinafter jointly also referred to as "Software" or "Services").
	</p>

	<p class={paragraph}>
		By accessing, registering for, downloading, and/or using our programs, software, or services in
		any manner, you (hereinafter also referred to as "User" or "Customer") agree to the Terms of
		Service and all other operating rules, policies, procedures, or regulations herein and as they
		may be published or updated from time to time by MB SMART FILTERING LLC (hereinafter also
		referred to as "MB," "Company," "Provider," or "Us"). Certain of the Services may be subject to
		additional terms and conditions as may be specified by MB from time to time. Your use of our
		Software is subject to those additional terms and conditions, which are incorporated into these
		Terms of Service by this reference. These Terms of Service apply to all users of our Software,
		including, without limitation, users who are contributors of content, information, and other
		materials or services, registered or otherwise.
	</p>

	<h3 id="use-of-software" class={heading}>A. Use of Software</h3>
	<p class={paragraph}>
		You may use our Software only for legal purposes and in accordance with these Terms. By using
		our Software, you agree that:
	</p>

	<ol type="a" class={listOuter}>
		<li class={body}>
			You will not use our Software in any way that violates any applicable federal, state, local,
			or international law or regulation;
		</li>
		<li class={body}>
			You are responsible for all activity in connection with the Software that occurs on your
			device including third party activity.
		</li>
		<li class={body}>
			The Customer shall not, and shall not permit any third party to:
			<ol type="i" class={listInner}>
				<li class={body}>
					Copy, modify, adapt, translate, reverse-engineer, decompile, disassemble, or create
					derivative works of the Software;
				</li>
				<li class={body}>
					Remove, alter, or obscure any proprietary notices or labels on the Software;
				</li>
				<li class={body}>
					Use the Software in any manner that infringes or misappropriates the intellectual property
					rights of MB or any third party.
				</li>
			</ol>
		</li>
		<li class={body}>
			You shall not:
			<ol type="i" class={listInner}>
				<li class={body}>
					take any action that imposes or may impose (as determined by us in our sole discretion) an
					unreasonable or disproportionately large load on our (or our third party providers')
					infrastructure;
				</li>
				<li class={body}>
					interfere or attempt to interfere with the proper working of the Services or any
					activities conducted by us in relation to the Services;
				</li>
				<li class={body}>
					bypass, circumvent or attempt to bypass or circumvent any measures we may use to prevent
					or restrict access to the Services (or other accounts, computer systems or networks
					connected to the Services);
				</li>
				<li class={body}>run any form of auto-responder or "spam" on the Services;</li>
				<li class={body}>
					use manual or automated software, devices, or other processes to "crawl" or "spider" any
					page;
				</li>
				<li class={body}>harvest or scrape any content or information from the Services; or</li>
				<li class={body}>otherwise take any action in violation of our guidelines and policies.</li>
			</ol>
		</li>
		<li class={body}>
			You shall not (directly or indirectly):
			<ol type="i" class={listInner}>
				<li class={body}>
					decipher, decompile, disassemble, reverse engineer or otherwise attempt to derive any
					source code or underlying ideas or algorithms of any part of the Services (including
					without limitation, any application),
				</li>
				<li class={body}>
					modify, translate, or otherwise create derivative works of any part of the Services, or
				</li>
				<li class={body}>
					copy, rent, lease, distribute, or otherwise transfer any of the rights that you receive
					hereunder. You shall abide by all applicable local, state, national and international laws
					and regulations.
				</li>
			</ol>
		</li>
		<li class={body}>
			You warrant that you own the devices being monitored through use of the Services and/or have
			the consent of the parties who own or use the devices being monitored. You also agree to not
			monitor or manage any devices using the Services that are used or owned by neither your
			children or other dependents nor individuals consenting to the use of the Services on their
			devices.
		</li>
		<li class={body}>
			We also reserve the right to access, read, preserve, and disclose any information as we
			reasonably believe is necessary to:
			<ol type="i" class={listInner}>
				<li class={body}>
					satisfy any applicable law, regulation, legal process or governmental request,
				</li>
				<li class={body}>
					enforce these Terms of Service, including investigation of potential violations hereof,
				</li>
				<li class={body}>
					detect, prevent, or otherwise address fraud, security or technical issues,
				</li>
				<li class={body}>respond to user support requests, or</li>
				<li class={body}>
					protect the rights, property or safety of us, our users and the public.
				</li>
			</ol>
		</li>
		<li class={body}>
			Any feedback, suggestions, or improvements provided by the Customer related to the Software
			("Feedback") shall become the sole property of MB and MB shall have the unrestricted right to
			use such Feedback for any purpose without obligation or compensation to the Customer.
		</li>
	</ol>

	<h3 id="intellectual-property" class={heading}>B. Intellectual Property Protection</h3>
	<ol type="a" class={listOuter}>
		<li class={body}>
			<strong>Ownership of Intellectual Property.</strong> All intellectual property rights, including
			copyrights, trademarks, patents, trade secrets, and any other proprietary rights, in and to the
			Software, its components, underlying code, documentation, and any modifications, updates, or derivatives
			(collectively, the "Intellectual Property"), are and shall remain the sole and exclusive property
			of MB or its licensors.
		</li>
	</ol>

	<h3 id="software-function" class={heading}>C. Software Function and Use of Information</h3>
	<ol type="a" class={listOuter}>
		<li class={body}>
			<strong>Purpose and function.</strong> The purpose and function of the MB Software is to monitor,
			filter, and block certain capabilities of your device either internally or in its connectivity to
			other devices or the world wide web and other such programs or both. In order to achieve this end,
			you give up control of your device to MB and its Software thereby making MB the device manager.
			By using our Software, you voluntarily give up this control.
		</li>
		<li class={body}>
			<strong>Installation.</strong> The installation and uninstallation of MB's Software is usually handled
			by third parties. As such, MB does not control any aspect of the installation or the uninstallation
			of its Software and is not responsible for any errors, loss, or damage that may be associated with
			these processes.
		</li>
		<li class={body}>
			<strong>License to use.</strong> Subject to the terms of this Agreement, the Customer is granted
			a non-exclusive, non-transferable, revocable license to use the Software solely for its intended
			purpose as described herein. This license does not convey ownership of any Intellectual Property
			rights to the Customer.
		</li>
		<li class={body}>
			<strong>Payment and fees.</strong> The use of our Software requires the payment of fees. You agree
			to pay all fees and charges incurred in connection with your use of our Software. You further acknowledge
			and agree that the fees may change from time to time and at the sole discretion of MB. You will
			receive a Notice of such fee changes before they are applied and will have the opportunity to cancel
			the Software. Continued use of the Software after the effective date of any fee changes constitutes
			acceptance of such fees and an agreement to pay them in the manner set forth herein or in such other
			agreement as may apply. Unless otherwise stated, all fees are exclusive of applicable taxes, levies,
			or duties imposed by taxing authorities.
		</li>
		<li class={body}>
			<strong>Failure to pay.</strong> Failure to pay the fees by their due date will result in the suspension
			and/or termination of your access to the Software. ONCE ACCESS TO THE SOFTWARE IS TERMINATED THE
			DEVICE MAY BECOME BLOCKED AND ALL FEATURES MAY BE INOPERABLE. THIS MAY INCLUDE EMERGENCY FEATURES
			SUCH AS DIALING EMERGENCY SERVICES. IN ORDER TO AVOID ANY SUCH PROBLEMS, YOU MUST ENSURE THE SOFTWARE
			IS UNINSTALLED PROPERLY. YOU MAY GO TO A THIRD PARTY (SUCH AS THE THIRD PARTY THAT INSTALLED THE
			SOFTWARE) TO UNINSTALL THE SOFTWARE FROM YOUR DEVICE. We will attempt to notify you before this
			happens so that you may address the matter before the device is blocked. However, the responsibility
			to get the Software uninstalled before the device is blocked is solely yours and you hereby expressly
			waive and hold MB and its Affiliates (defined later) harmless from any damage or loss that is caused,
			directly or indirectly, by the blocking of your device and your lack of access to it and its functions.
		</li>
		<li class={body}>
			<strong>Cancellation.</strong> You may cancel your subscription to the Software at any time by emailing
			MB. You may also cancel your subscription to the Software by contacting the third party entity that
			installed the Software on your device. However, cancellation through a third party entity will only
			be effective once the third party contacts MB and provides notice of the cancellation request. Should
			you choose to cancel your subscription, you must uninstall the Software from your device (the entity
			that installed the Software will usually be able to uninstall the Software). Failure to have the
			Software uninstalled will result in your device being blocked at the end of the applicable term.
		</li>
		<li class={body}>
			<strong>Refunds.</strong> Except as expressly stated in the Terms, all fees are non-refundable,
			including cases of termination, cancellation, or non-use of the Software.
		</li>
		<li class={body}>
			<strong>Auto-renewal of Software use.</strong> Unless you opt out of auto-renewal, any subscription
			services you have signed up for will be automatically extended for successive renewal periods of
			the same duration as the subscription term originally selected, at the then-current, non-promotional
			rate. You may cancel your subscription to the Software, the auto-renewal, or otherwise change your
			subscription, at any time by emailing MB. You may also cancel your subscription of the Software
			by contacting the third party entity that installed the Software on your device. However, cancellation
			through a third party entity will only be effective once the third party contacts MB and provides
			notice of the cancellation request. If you terminate Service, you may use your subscription until
			the end of your then-current term and your subscription will not be renewed after your then-current
			term expires. However, you won't be eligible for a prorated refund of any portion of the subscription
			fee paid for a then-current subscription period.
		</li>
		<li class={body}>
			<strong>Third party services.</strong> The Software may permit you to link or access other websites,
			services, programs, software, or resources on the Internet. When you access third party resources
			on the Internet, you do so at your own risk. These other resources are not under our control, and
			you acknowledge that we are not responsible or liable for the content, functions, accuracy, legality,
			appropriateness or any other aspect of such websites or resources. The inclusion of any such link
			does not imply our endorsement or any association between us and their operators. You further acknowledge
			and agree that we shall not be responsible or liable, directly or indirectly, for any damage or
			loss caused or alleged to be caused by or in connection with the use of or reliance on any such
			content, goods or services available on or through any such website or resource.
		</li>
	</ol>

	<h3 id="privacy" class={heading}>D. Privacy and Personal Information</h3>
	<ol type="a" class={listOuter}>
		<li class={body}>
			<strong class={emphasis}
				>Voluntary provision of information and agreement to disclose; protection of password.</strong
			> You, as the user, are voluntarily providing MB with certain information and with permission to
			monitor and record use of your computing device. You, as the user, agree that all users of your
			computing device and user ID will be informed that monitoring/recording is being made, and that
			in so being informed, other users will not have their privacy invaded. You should recognize the
			value of your user ID, and that casually allowing others to use your ID can lead to inappropriately
			ascribing computing device use to your own account; and you, the user, agree that MB is not responsible
			for maintaining the privacy of your user ID.
		</li>
		<li class={body}>
			<strong class={emphasis}>Collected information.</strong>
			MB may collect the following types of personal information from you:
			<ol type="i" class={listInner}>
				<li class={body}>
					<strong class={emphasis}>Contact Information:</strong> When you sign up for our Software, we
					may collect your name, email address, phone number, and other contact information.
				</li>
				<li class={body}>
					<strong class={emphasis}>Usage Information:</strong> We may collect information about how you
					use our Software, such as the websites and apps you visit, the times and dates of your visits,
					information you input into such websites or apps, your IP address, and other information as
					may be collected by the website, proxies, or the Software. Some versions of the Software also
					collect and manage other personal information from your device such as photographs or other
					information you save on your device.
				</li>
				<li class={body}>
					<strong class={emphasis}>Device Information:</strong> We may collect information about the devices
					you use to access our Software, including the type of device, its operating system, and browser
					type.
				</li>
				<li class={body}>
					<strong class={emphasis}>Payment Information:</strong> If you choose to purchase our Software,
					we may collect your payment information, including your credit card number, billing address,
					and other payment details.
				</li>
			</ol>
		</li>
		<li class={body}>
			<strong class={emphasis}>Use of Information.</strong>
			We may use your personal information for the following purposes:
			<ul class={listInnerDisc}>
				<li class={body}>To provide you with our web and app filtering Software</li>
				<li class={body}>To improve our Software and customize your experience</li>
				<li class={body}>
					To communicate with you about our Software, including updates and promotions
				</li>
				<li class={body}>To process your payments and manage your account</li>
				<li class={body}>To comply with legal requirements and enforce our policies</li>
				<li class={body}>
					To provide you with information about other products or services in which you may be
					interested
				</li>
			</ul>
		</li>
		<li class={body}>
			<strong class={emphasis}>Rights.</strong> You have the right to:
			<ul class={listInnerDisc}>
				<li class={body}>Opt out of receiving promotional emails from us</li>
				<li class={body}>Request access to personal information we have collected from you</li>
				<li class={body}>Request that we delete personal information</li>
			</ul>
		</li>
		<li class={body}>
			<strong class={emphasis}>Sharing of Information.</strong>
			We may share your personal information with the following types of third parties:
			<ol type="i" class={listInner}>
				<li class={body}>
					<strong class={emphasis}>Service Providers:</strong> We may share your information with third-party
					service providers who help us provide our Services, such as payment processors and hosting providers.
				</li>
				<li class={body}>
					<strong class={emphasis}>Business Partners:</strong> We may share your information with our
					business partners to offer you promotions and other benefits.
				</li>
				<li class={body}>
					<strong class={emphasis}>Law Enforcement:</strong> We may disclose your information to law enforcement
					agencies or other government entities as required by law.
				</li>
				<li class={body}>
					We may sell or otherwise use aggregate data for other purposes but we will not sell or use
					your personal data in any manner except as described in these Terms.
				</li>
			</ol>
		</li>
		<li id="extension-limited-use" class="{body} scroll-mt-6">
			<strong class={emphasis}
				>Browser Extension Data (Chrome Web Store &mdash; Limited Use).</strong
			>
			Our browser extension (MB Smart Extension) inspects the content of web pages you visit in order
			to filter it. To do this, it transmits page content &mdash; including images, video frames, and
			text &mdash; to MB Smart Filtering LLC's filtering servers, where it is analyzed in real time to
			block or blur content according to your configured settings. Our collection and use of this data
			complies with the
			<a
				href="https://developer.chrome.com/docs/webstore/program-policies/limited-use"
				target="_blank"
				rel="noopener noreferrer"
				class={link}>Chrome Web Store User Data Policy, including the Limited Use requirements</a
			>: data collected through the browser extension is used solely to provide and improve the
			content-filtering feature. We do not sell this data, and we do not use or transfer it for
			advertising, promotions, or any purpose unrelated to content filtering. The &ldquo;Business
			Partners&rdquo; and aggregate-data provisions above do not apply to data collected by the
			browser extension. Web content is processed to return a filtering decision and is not retained
			beyond what is necessary to provide the filtering service.
		</li>
	</ol>

	<h3 id="liability" class={heading}>
		E. Assumption of Risk, Indemnification, and Limitation of Liability
	</h3>
	<p class={paragraph}>
		The Customer acknowledges and agrees that the use of MB's Software, programs, apps, installation
		or uninstallation service, and/or any other service we currently provide or which we may provide
		in the future, involves inherent risks, including but not limited to:
	</p>
	<ul class={listOuterDisc}>
		<li class={body}>The potential for software defects, bugs, or errors</li>
		<li class={body}>Vulnerabilities to cybersecurity threats or unauthorized access</li>
		<li class={body}>Compatibility issues with third-party systems or hardware</li>
		<li class={body}>
			Downtime, interruptions, or delays in the operation of the Software or your device
		</li>
	</ul>

	<ol type="a" class={listOuter}>
		<li class={body}>
			<strong class={emphasis}>Assumption of risk:</strong> By using MB's Services, software, programs,
			and/or apps, the Customer expressly assumes all risks associated with its use
		</li>
		<li class={body}>
			<strong class={emphasis}>Customer responsibility:</strong> The Customer accepts sole responsibility
			for evaluating the suitability of the MB's Services, software, programs, and/or apps for their intended
			use and assumes all risks associated with their deployment, configuration, and operation, including
			the risks of data loss, corruption, or unauthorized disclosure.
		</li>
		<li class={body}>
			<strong class={emphasis}>No Guarantee of error-free operation:</strong> The Customer acknowledges
			that no software can be completely free of defects or vulnerabilities and that MB does not guarantee
			uninterrupted or error-free operation of MB's Services, software, programs, and/or apps.
		</li>
		<li class={body}>
			<strong class={emphasis}>Mitigation measures:</strong>
			The Customer is responsible for implementing and maintaining appropriate safeguards, including:
			<ul class={listInnerDisc}>
				<li class={body}>Regular data backups</li>
				<li class={body}>Security measures to protect against unauthorized access</li>
				<li class={body}>
					Policies and procedures for the use of the Software in accordance with applicable laws and
					regulations
				</li>
			</ul>
		</li>
		<li class={body}>
			<strong class={emphasis}>Indemnity for customer use:</strong> The Customer agrees to indemnify and
			hold harmless MB from any claims, losses, or damages directly or indirectly arising from or caused
			by, the Software, the Customer's use of the Software, and/or the installation or uninstallation
			of the Software from the device regardless of whether the Customer took mitigation measures to avoid
			such damages.
		</li>
		<li class={body}>
			<strong class={emphasis}>Indemnification of MB and its Affiliates.</strong> You shall defend, indemnify,
			and hold harmless us and each of our and their respective employees, contractors, directors, suppliers
			and representatives ("Affiliates") from all liabilities, claims, and expenses, including reasonable
			attorneys' fees, that arise from or relate to your use or misuse of, or access to, the Services,
			content, or otherwise from your user content, violation of these Terms of Service, or infringement
			by you, or any third party using your account or identity in the Services, of any Intellectual Property
			or other right of any person or entity. We reserve the right to assume the exclusive defense and
			control of any matter otherwise subject to indemnification by you, in which event you will assist
			and cooperate with us in asserting any available defenses.
		</li>
		<li class={body}>
			<strong class={emphasis}>Limitation of liability.</strong>
			In no event shall we, nor our directors, employees, agents, partners, suppliers or content providers,
			be liable under contract, tort, strict liability, negligence or any other legal or equitable theory
			with respect to the services:
			<ol type="i" class={listInner}>
				<li class={body}>
					for any lost profits, data loss, cost of procurement of substitute goods or services, or
					special, indirect, incidental, punitive, compensatory or consequential damages of any kind
					whatsoever (however arising),
				</li>
				<li class={body}>
					for any bugs, viruses, trojan horses, or the like (regardless of the source of
					origination), or
				</li>
				<li class={body}>
					for any direct damages in excess of (in the aggregate) of the greater of (a) fees paid to
					us for the particular services during the immediately previous three (3) month period or
					(b) $500.00.
				</li>
			</ol>
		</li>
		<li class={body}>
			<strong class={emphasis}>Waiver of warranties.</strong> To the maximum extent permitted by applicable
			law, the Software is provided "as is" without any express or implied warranties, including but not
			limited to warranties of merchantability, fitness for a particular purpose, title, non-infringement,
			or any warranty arising from course of performance, course of dealing, or usage of trade. Any implied
			warranties that cannot be disclaimed are limited to the minimum extent permitted by law.
		</li>
	</ol>

	<h3 id="miscellaneous" class={heading}>F. Miscellaneous</h3>
	<ol type="a" class={listOuter}>
		<li class={body}>
			<strong class={emphasis}>No Waiver.</strong> Our failure to enforce any part of these Terms of Service
			shall not constitute a waiver of our right to later enforce that or any other part of these Terms
			of Service. Waiver of compliance in any particular instance does not mean that we will waive compliance
			in the future. In order for any waiver of compliance with these Terms of Service to be binding,
			we must provide you with written notice of such waiver through one of our authorized representatives.
		</li>
		<li class={body}>
			<strong class={emphasis}>Notices.</strong> Unless otherwise specified in these Term of Service,
			all notices under these Terms of Service will be in writing and will be deemed to have been duly
			given when received, if personally delivered or sent by certified or registered mail, return receipt
			requested; when receipt is electronically confirmed, if transmitted by facsimile or e-mail; or the
			day after it is sent, if sent for next day delivery by recognized overnight delivery service. We
			may also provide Notice to you via the app, website, or pop-up, or by email or text to whichever
			email address and telephone number you have provided us.
		</li>
		<li class={body}>
			<strong class={emphasis}>Entire Agreement and Severability.</strong> These Terms of Service are
			the entire agreement between you and MB with respect to the Services and supersede all prior or
			contemporaneous communications and proposals (whether oral, written or electronic) between you and
			MB with respect to the Services. If any provision of these Terms of Service is found to be unenforceable
			or invalid, that provision will be limited or eliminated to the minimum extent necessary so that
			these Terms of Service will otherwise remain in full force and effect and enforceable. The failure
			of either party to exercise in any respect any right provided for herein shall not be deemed a waiver
			of any further rights hereunder
		</li>
		<li class={body}>
			<strong class={emphasis}>Force Majeure.</strong> We shall not be liable for any failure to perform
			our obligations hereunder where such failure results from any cause beyond our reasonable control,
			including, without limitation, mechanical, electronic or communications failure or degradation.
		</li>
		<li class={body}>
			<strong class={emphasis}>Assignment.</strong> These Terms of Service are personal to you, and are
			not assignable, transferable or sublicensable by you except with our prior written consent. We may
			assign, transfer or delegate any of our rights and obligations hereunder without consent.
		</li>
		<li class={body}>
			<strong class={emphasis}>Agency.</strong> No agency, partnership, joint venture, or employment relationship
			is created as a result of these Terms of Service and neither party has any authority of any kind
			to bind the other in any respect.
		</li>
		<li class={body}>
			<strong class={emphasis}>Headings.</strong> The section and paragraph headings in these Terms of
			Service are for convenience only and shall not affect their interpretation.
		</li>
		<li class={body}>
			<strong class={emphasis}>Modification.</strong> We reserve the right, in our sole discretion, to
			modify or replace any of these Terms of Service, or change, suspend, or discontinue the Services
			(including without limitation, the availability of any feature, database, or content) at any time
			by posting a notice on the site or by sending you notice through the Services, via e-mail or by
			another appropriate means of electronic communication. We may also impose limits on certain features
			and services or restrict your access to parts or all of the Services without notice or liability.
			While we will timely provide notice of modifications, it is also your responsibility to check these
			Terms of Service periodically for changes. Your continued use of the Services following notification
			of any changes to these Terms of Service constitutes acceptance of those changes, which will apply
			to your continued use of the Services going forward. Your use of the Services is subject to the
			Terms of Service in effect at the time of such use.
		</li>
		<li class={body}>
			<strong class={emphasis}>Termination.</strong> We may terminate your access to all or any part of
			the Services at any time, with or without cause, with or without notice, effective immediately,
			which may result in the forfeiture and destruction of all information associated with your membership.
			Any fees paid hereunder are non-refundable. All provisions of these Terms of Service which by their
			nature should survive termination shall survive termination, including, without limitation, licenses
			of user content, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
		</li>
		<li class={body}>
			<strong class={emphasis}>Current Information Required.</strong> You must provide current, complete
			and accurate information for your billing account. You must promptly update all information to keep
			your billing account current, complete and accurate (such as a change in billing address, credit
			card number, or credit card expiration date), and you must promptly notify us or our payment processor
			if your payment method is canceled (e.g., for loss or theft) or if you become aware of a potential
			breach of security, such as the unauthorized disclosure or use of your user name or password. If
			you fail to provide any of the foregoing information, you agree that we may continue charging you
			for any use of paid services under your billing account unless you have terminated your paid services
			as set forth above.
		</li>
	</ol>

	<h3 class={heading}>G. SMS Verification Messages</h3>
	<p class={paragraph}>
		As part of using the Software, we may send you SMS text messages for account and device
		verification purposes.
	</p>
	<p class={paragraph}>These messages may include:</p>
	<ul class={listOuterDisc}>
		<li class={body}>
			One-time passwords and verification codes used to sign in or confirm actions;
		</li>
		<li class={body}>Device linking and confirmation messages;</li>
		<li class={body}>Important security notifications related to your account.</li>
	</ul>
	<p class={paragraph}>Message frequency varies based on your account activity.</p>
	<p class={paragraph}>Message and data rates may apply according to your mobile carrier plan.</p>
	<p class={paragraph}>
		These messages are transactional and required to operate the service. To stop receiving them you
		would need to discontinue use of the Software.
	</p>
	<p class={paragraph}>
		By providing your phone number, you consent to receive these verification and security text
		messages.
	</p>

	<h3 class={heading}>H. SMS Data and Privacy</h3>
	<p class={paragraph}>We respect the privacy of your mobile information.</p>
	<p class={paragraph}>We do not send marketing or promotional text messages.</p>
	<p class={paragraph}>
		We do not sell, rent, or share your mobile phone number or SMS opt-in data with third parties
		for their marketing purposes.
	</p>
	<p class={paragraph}>
		Your phone number may be shared only with the messaging providers that deliver these messages on
		our behalf.
	</p>
	<p class={paragraph}>
		For help or questions regarding these messages, please contact our support team.
	</p>
</div>
