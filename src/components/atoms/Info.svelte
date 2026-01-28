<script>
	// Props - Svelte 5 style
	let { label = '', variant = 'tooltip' } = $props();

	let showTooltip = $state(false);

	// Directory of info texts mapped by label
	const infoDirectory = {
		'Device Protection': {
			text: 'Enable or disable content filtering and protection features for this device.',
			width: '16rem'
		},

		// Settings page
		'Show Info Helpers': { text: 'this is an example helper', width: '11rem' },

		// Device page
		// Apps
		// 'Allow New Apps Automatically': {
		// 	text: 'Apps downloaded from the store will not need a request to unlock them.<br><br><strong>It is unsafe to leave it on;</strong> user could open any downloaded app.',
		// 	width: '16rem'
		// },
		'Bypass App Approval Requests': {
			text: 'When ON, ignores all category settings and allows new apps instantly. When OFF, uses rules below. <br><br><strong>It is unsafe to leave it on;</strong> user could open any downloaded app.',
			width: '16rem'
		},

		// Apps and Websites (those that are unique from DNS Filtering categories)
		Banks_site: {
			text: 'Websites of financial institutions that provide banking, loan, investment, and account management services.',
			width: '16rem'
		},
		Banks_app: {
			text: 'Apps of financial institutions that provide banking, loan, investment, and account management services.',
			width: '16rem'
		},
		Jewish_site: {
			text: 'Websites created by and for the Jewish community.',
			width: '16rem'
		},
		Jewish_app: {
			text: 'Apps created by and for the Jewish community.',
			width: '16rem'
		},
		Tools_site: {
			text: 'Helpful online tools like calculators, converters, and document editors.',
			width: '16rem'
		},
		Tools_app: {
			text: 'Helpful apps like calculators, converters, and document editors.',
			width: '16rem'
		},
		Torah_site: {
			text: 'Websites that focus on Torah study.',
			width: '15rem'
		},
		Torah_app: {
			text: 'Apps that focus on Torah study.',
			width: '15rem'
		},
		'Jewish News_site': {
			text: 'News websites focusing on Jewish community events, religious news, and global issues affecting Jewish populations.',
			width: '16rem'
		},
		'Jewish News_app': {
			text: 'Apps focusing on Jewish community events, religious news, and global issues affecting Jewish populations.',
			width: '16rem'
		},
		'Safe Information_site': {
			text: 'Websites that offer general, factual, or educational content on neutral and non-sensitive topics.',
			width: '16rem'
		},
		'Safe Information_app': {
			text: 'Apps that offer general, factual, or educational content on neutral and non-sensitive topics.',
			width: '16rem'
		},
		'Safe Shopping_site': {
			text: 'Online stores that sell everyday and non-sensitive items.',
			width: '16rem'
		},
		'Safe Shopping_app': {
			text: 'Online stores that sell everyday and non-sensitive items.',
			width: '16rem'
		},
		Entertainment_site: {
			text: 'Websites streaming entertainment content, including movies and TV shows.',
			width: '16rem'
		},
		Entertainment_app: {
			text: 'Apps streaming entertainment content, including movies and TV shows.',
			width: '16rem'
		},
		'Social Media_site': {
			text: 'Social networking sites.<br><br>For example: WhatsApp, Instagram, X (Twitter), Facebook, Pinterest.',
			width: '16rem'
		},
		'Social Media_app': {
			text: 'Social networking apps.<br><br>For example: WhatsApp, Instagram, X (Twitter), Facebook, Pinterest.',
			width: '16rem'
		},

		// Extension
		'Detection Level': {
			text: '<strong>Strict:</strong> maximum protection but may overblock some content.<br><br><strong>Moderate:</strong> minimizes overblocking but may miss some instances.',
			width: '16rem'
		},
		'Skin Painting': {
			text: `Genre-based skin painting image filtering:<br><br><ol class="list-decimal list-inside space-y-4"><li><strong>All People:</strong><br>Applies the skin painting filtering to all people.</li><li><strong>Women - Strict:</strong><br>Applies skin painting filtering to women, potentially overblocking some content for men.</li><li><strong>Women - Moderate:</strong><br>Applies skin painting filtering to women, minimizing overblocking but may miss some instances.</li></ol>`,
			width: '16rem'
		},
		'Explicit Image Removal': {
			text: 'Removes images completely based on their explicitness, with different levels dictating how explicit an image needs to be for removal.',
			width: '16rem'
		},
		'Human Removal': {
			text: `Genre-based human removal on images:<br><br><ol class="list-decimal list-inside space-y-4"><li><strong>All People:</strong><br>Removes all human images.</li><li><strong>Women - Strict:</strong><br>Removes all human images of women, potentially overblocking some content for men.</li><li><strong>Women - Moderate:</strong><br>Removes all human images of women, minimizing overblocking but may miss some instances.</li></ol>`,
			width: '16rem'
		},

		'Block Videos': {
			text: "(Beta — many don't get blocked)<br><br>Enable/disable video content blocking",
			width: '16rem'
		},
		"Image Filtering (Beta — many don't get filtered)": {
			text: 'Enable/disable image content filtering',
			width: '16rem'
		},

		// Features
		'Youtube embed Fix Chrome': {
			text: 'Allow access to play embed YouTube videos in Chrome.',
			width: '16rem'
		},
		'Block Video Playback in Google': {
			text: 'Prevents videos from playing within the search results.',
			width: '16rem'
		},
		'Allow Vimeo Embeded Videos': {
			text: 'Allow access to play embed Vimeo videos.',
			width: '16rem'
		},
		'Youtube Restricted Moderate Level': {
			text: 'Sets Youtube restriction to a <strong>Moderate</strong> level.<br><br>Filters out strong mature content, but allows a wider range of videos, potentially including some milder themes.',
			width: '20rem'
		},
		'Youtube Restricted Strict Level': {
			text: 'Sets Youtube restriction to a <strong>Strict</strong> level.<br><br>Filters for mature content like violence, swearing, and suggestive themes.',
			width: '20rem'
		},

		'Block Whatsapp Channels (Blur)': {
			text: 'Removes media from WhatsApp channels.',
			width: '16rem'
		},
		'Block Whatsapp Sticker Generator and AI Studio': {
			text: 'Blocks the ability to create Stickers with Meta AI.',
			width: '16rem'
		},
		'Allow WhatsApp Catalogs': {
			text: 'Allows access to Whatsapp catalogs.',
			width: '16rem'
		},
		'Block WhatsApp Music': {
			text: 'Blocks WhatsApp Music inside Statuses.',
			width: '16rem'
		},
		'Whatsapp Profile Pics Blur': {
			text: 'Slightly blurs profile pictures (only blurs full-sized profile pictures).',
			width: '16rem'
		},
		'Block Whatsapp AI (Beta)': {
			text: 'Blocks the ability to chat with Meta AI.',
			width: '16rem'
		},
		'Draw Over Whatsapp Channels(Beta)': {
			text: 'Draws over WhatsApp channel icons in the updates section.',
			width: '16rem'
		},
		'Draw Over Whatsapp Status': {
			text: 'Draws over WhatsApp updates section.',
			width: '16rem'
		},
		'Draw over Whatsapp Profile Pics': {
			text: 'Draws a line over profile pictures.',
			width: '16rem'
		},
		"Block Whatsapp Status (If Draw Doesn't Work)": {
			text: 'Blocks access to WhatsApp statuses.',
			width: '16rem'
		},
		'Block Whatsapp Status 2(In case Draw Doesnt Work)': {
			text: 'Blocks access to WhatsApp statuses.',
			width: '16rem'
		},

		'Block Spotify Media': {
			text: 'Removes Spotify images and videos.'
		},
		'Block Spotify Videos Only': {
			text: 'Removes Spotify videos.'
		},
		'Block Apple Media': {
			text: 'Removes Apple Store & Apple Music media.',
			width: '16rem'
		},
		'Block Grok Images': {
			text: 'Blocks generative images and videos inside the Grok app.',
			width: '16rem'
		},
		'Block Amazon Review Videos': {
			text: 'Blocks Amazon Review Videos.'
		},
		'Google Site Remove Images': {
			text: 'Blocks images in Google Search (only if has DNS profile).',
			width: '16rem'
		},
		'Block Twitter Media': {
			text: 'Blocks all media on Twitter / X.'
		},
		'Google Site Block Images Tab': {
			text: 'Blocks access to the Google Images tab (only if has DNS profile).',
			width: '16rem'
		},
		'Block images inside Gmail app': {
			text: 'Blocks all images on Gmail app.'
		},
		'Block Bing Photo Search': {
			text: 'Blocks Bing Photo Search tool.'
		},
		'Block ChatGPT Photo Generation': {
			text: 'Blocks ChatGPT photo generation.'
		},
		'Block ChatGPT Agent Browser': {
			text: 'Blocks ChatGPT internal browser.'
		},
		'In App Image Filter (Pro)': {
			text: 'Image filter inside apps (only some apps get filtered).',
			width: '16rem'
		},
		'In App Image Filter - Walmart': {
			text: 'Image filter inside Walmart app.'
		},
		'In App Image Filter - Youtube': {
			text: 'Image filter inside YouTube app.'
		},
		'In App Image Filter - only Amazon': {
			text: 'Image filter inside Amazon app.'
		},
		'In App Image Filter - Amazon Block Videos': {
			text: 'Blocks all videos from Amazon.',
			width: '16rem'
		},
		'Block Google Chat': {
			text: 'Blocks Google Chat inside Gmail.'
		},
		'Block Copilot (Bing AI) Chat': {
			text: 'Blocks Bing AI Chat inside any app.'
		},
		'Block Google Lens': {
			text: 'Blocks Google Lens inside any app.'
		},
		'Block Images DuckDuckGo': {
			text: `Blocks images inside DuckDuckGo. It's recommended to close the Search Category.`,
			width: '16rem'
		},
		'Apple Music Block (Beta)': {
			text: 'Blocks Apple Music completely.'
		},
		'Google Assistant Fix': {
			text: 'Google app will open without images and with safe search on. May fail occasionally.',
			width: '16rem'
		},
		'Android Auto Fix 2': {
			text: 'Fixes issues with Android Auto connectivity.',
			width: '16rem'
		},
		'Block Playstore Access': {
			text: 'Block Play Store access without closing the app.<br>This helps for apps that need the Play Store open.',
			width: '16rem'
		},
		'Block RCS Chat - Gemini AI': {
			text: 'Blocks RCS Chat inside the Google Messages app. Blocks Gemini AI too.',
			width: '16rem'
		},
		'Block Google Maps Images Fix': {
			text: 'Google maps will open without images.'
		},
		'Block Media on Spotify App': {
			text: 'Blocks Spotify Images & Videos.'
		},

		// Apple Restrictions
		'Safari Mode': {
			text: `<ol class="list-decimal list-inside space-y-4"><li><strong>Whitelist:</strong><br>Safari will only open previously allowed URLs.</li><li><strong>Limit Adult Content:</strong><br>Uses Apple's keywords to block searches on adult content and DNS filter based on the open categories.</li><li><strong>No Restriction:</strong><br>Removes all Safari restrictions and uses only DNS.</li></ol><br><strong>Note:</strong> DNS must be enabled if safari isn't on whitelist mode`,
			width: '16rem'
		},
		'In-App Browser Mode': {
			text: `With MB Pro only, Safari has text and image filtering.<br><br><ol class="list-decimal list-inside space-y-4"><li><strong>Block All In-app Browsers (IABs) (Secure):</strong><br>Even with Safari in 'Limit Adult' mode, all other browsers are restricted to whitelist mode.</li><li><strong>Block Only Webkit (Moderate):</strong><br>Safari Webkit Window allows access based on whitelist, while other browsers allow access based on DNS Categories.</li><li><strong>All IABs DNS (Lenient):</strong><br>All IABs and Browsers use DNS without text or image filters, applicable across all apps.</li></ol>`,
			width: '16rem'
		},
		'App Ratings': {
			text: "Applies Apple Store's app rating criteria.",
			width: '14rem'
		},
		'Movie Ratings': {
			text: "Applies Apple's movie rating criteria.",
			width: '14rem'
		},
		'Allow Siri User-Generated Content': {
			text: 'Allows Siri to search for content on the web.',
			width: '14rem'
		},
		'Allow Video Conferencing': {
			text: 'Enables the use of FaceTime for video calls.',
			width: '14rem'
		},
		'Allow Explicit Content': {
			text: 'Permits access to explicit content in Apple Music, Podcasts, News and Fitness.',
			width: '14rem'
		},
		'Allow iMessage': {
			text: 'Enables iMessage communication.',
			width: '14.75rem'
		},
		'Allow App Clips': {
			text: 'Allows quick access to specific parts of an app without full installation of the app.',
			width: '16rem'
		},
		'Allow Find My Device': {
			text: 'Permits use of Find My Device; to disable, it must be manually disabled on the device.',
			width: '16rem'
		},
		'Allow Screen Time Restrictions': {
			text: 'Enables Screen Time limits; toggling off and on resets the password.',
			width: '16rem'
		},

		// DNS Filtering
		Business_site: {
			text: 'Safe category.<br><br>Websites related to finance, trading, government, business resources, tools for professionals and charitable organizations.',
			width: '16rem'
		},
		Business_app: {
			text: 'Safe category.<br><br>Apps related to finance, trading, government, business resources, tools for professionals and charitable organizations.',
			width: '16rem'
		},
		Technology_site: {
			text: 'Safe category.<br><br>Websites dedicated to web hosting services, online meetings, security-enhanced websites, and general technology information.<br><br><strong>Torah</strong> websites are included.',
			width: '16rem'
		},
		Technology_app: {
			text: 'Safe category.<br><br>Apps dedicated to web hosting services, online meetings, security-enhanced websites, and general technology information.<br><br><strong>Torah</strong> apps are included.',
			width: '16rem'
		},
		Jobs_site: {
			text: 'Professional networking platforms, job search engines, industry-specific career opportunities, and business-related employment sites.',
			width: '16rem'
		},
		Jobs_app: {
			text: 'Professional networking apps, job search engines, industry-specific career opportunities, and business-related employment apps.',
			width: '16rem'
		},
		Information_site: {
			text: 'General informational websites such as encyclopedias, dictionaries, public databases, and educational resources.<br><br>Includes <strong>Jewish</strong> religious sites.',
			width: '16rem'
		},
		Information_app: {
			text: 'General informational apps such as encyclopedias, dictionaries, public databases, and educational resources.<br><br>Includes <strong>Jewish</strong> religious apps.',
			width: '16rem'
		},
		Travel_site: {
			text: 'Sites dedicated to booking services, destination guides, and travel advice.',
			width: '16rem'
		},
		Travel_app: {
			text: 'Apps dedicated to booking services, destination guides, and travel advice.',
			width: '16rem'
		},
		NoData_site: {
			text: 'Backend sites: covers infrastructure elements like data storage services; essential for web application operations.',
			width: '16rem'
		},
		NoData_app: {
			text: 'Backend services: covers infrastructure elements like data storage services; essential for app operations.',
			width: '16rem'
		},
		Chats_site: {
			text: 'Online communication platforms, including instant messaging services, chat rooms, and forums for live discussion.',
			width: '16rem'
		},
		Chats_app: {
			text: 'Communication apps, including instant messaging services, chat rooms, and forums for live discussion.',
			width: '16rem'
		},
		'Content Servers_site': {
			text: 'Focuses on digital content hosting, infrastructure services, content delivery networks, file sharing and storage platforms.',
			width: '16rem'
		},
		'Content Servers_app': {
			text: 'Focuses on digital content hosting, infrastructure services, content delivery networks, file sharing and storage platforms.',
			width: '16rem'
		},
		Health_site: {
			text: 'Websites focused on physical and mental health, including medical resources, wellness tips, and fitness guidance. May also include nutritional advice.',
			width: '16rem'
		},
		Health_app: {
			text: 'Apps focused on physical and mental health, including medical resources, wellness tips, and fitness guidance. May also include nutritional advice.',
			width: '16rem'
		},
		Shopping_site: {
			text: 'E-commerce and online marketplaces.'
		},
		Shopping_app: {
			text: 'E-commerce and online marketplaces.'
		},
		Games_site: {
			text: 'Websites dedicated to video games, gaming news, and game reviews.',
			width: '16rem'
		},
		Games_app: {
			text: 'Video games, and apps dedicated to gaming news and reviews.',
			width: '16rem'
		},
		Sports_site: {
			text: 'Sites providing sports news, event schedules, team information, live scores, and sports-related community forums.',
			width: '16rem'
		},
		Sports_app: {
			text: 'Apps providing sports news, event schedules, team information, live scores, and sports-related community forums.',
			width: '16rem'
		},
		Search_site: {
			text: 'Search engines and web directories. Only Google, Bing and Duckduckgo are included, and Safe Search is enforced.',
			width: '16rem'
		},
		Search_app: {
			text: 'Search engines and web directories.',
			width: '16rem'
		},
		News_site: {
			text: 'Websites offering current events, news reports and journalism.',
			width: '16rem'
		},
		News_app: {
			text: 'Apps offering current events, news reports and journalism.',
			width: '16rem'
		},
		Media_site: {
			text: 'Digital media platforms featuring videos, music, podcasts, and other forms of multimedia content.<br><br>For example: Youtube, Vimeo, Netflix.',
			width: '16rem'
		},
		Media_app: {
			text: 'Digital media platforms featuring videos, music, podcasts, and other forms of multimedia content.<br><br>For example: Youtube, Vimeo, Netflix.',
			width: '16rem'
		},
		SocialMedia_site: {
			text: 'Social networking sites.<br><br>For example: WhatsApp, Instagram, X (Twitter), Facebook, Pinterest.',
			width: '16rem'
		},
		SocialMedia_app: {
			text: 'Social networking apps.<br><br>For example: WhatsApp, Instagram, X (Twitter), Facebook, Pinterest.',
			width: '16rem'
		},
		Mature_site: {
			text: '<strong>NOT SAFE</strong><br><br>Websites containing content suitable only for adults, often restricted by age due to mature themes or explicit content.<br><br>For example: Gambling, Alcohol, Firearms.',
			width: '16rem'
		},
		Mature_app: {
			text: '<strong>NOT SAFE</strong><br><br>Apps containing content suitable only for adults, often restricted by age due to mature themes or explicit content.<br><br>For example: Gambling, Alcohol, Firearms.',
			width: '16rem'
		},
		Proxies_site: {
			text: '<strong>NOT SAFE</strong><br><br>Services that allow users to bypass internet filtering or restrictions, such as VPN and Proxies.',
			width: '16rem'
		},
		Proxies_app: {
			text: '<strong>NOT SAFE</strong><br><br>Services that allow users to bypass internet filtering or restrictions, such as VPN and Proxies.',
			width: '16rem'
		},
		Prohibited_site: {
			text: '<strong>NOT SAFE</strong><br><br>Websites that are blocked due to inappropriate or adult content.',
			width: '16rem'
		},
		Prohibited_app: {
			text: '<strong>NOT SAFE</strong><br><br>Apps that are blocked due to inappropriate or adult content.',
			width: '16rem'
		},
		'Ad Services_site': {
			text: 'Platforms and services dedicated to digital advertising, including ad networks, affiliate marketing, and promotional content.',
			width: '16rem'
		},
		'Ad Services_app': {
			text: 'Platforms and services dedicated to digital advertising, including ad networks, affiliate marketing, and promotional content.',
			width: '16rem'
		}

		// Specific apps
		// 'com.discord': {
		// 	text: 'test'
		// }
	};

	// Get info text for this label
	const infoText = $derived(infoDirectory[label]?.text || '');

	// Get info width for this label
	const infoWidth = $derived(infoDirectory[label]?.width || 'auto');

	// Import Lucide Info icon
	import { Bus, Info } from '@lucide/svelte';
</script>

{#if infoText}
	{#if variant === 'tooltip'}
		<div
			class="info-helper relative inline-block"
			onmouseenter={() => (showTooltip = true)}
			onmouseleave={() => (showTooltip = false)}
			role="tooltip"
			aria-label="Information"
		>
			<!-- Lucide Info Icon -->
			<Info
				class="h-4 w-4 cursor-help text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400"
				aria-hidden="true"
			/>

			<!-- Tooltip -->
			{#if showTooltip}
				<div
					class="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 -translate-y-2 transform whitespace-normal"
				>
					<!-- Arrow -->
					<div
						class="absolute top-full left-1/2 -translate-x-1/2 transform border-8 border-transparent border-t-gray-700"
					></div>
					<!-- Tooltip Content -->
					<div
						class="rounded-lg bg-gray-700 px-3 py-2 text-xs font-normal text-white"
						style="width: {infoWidth};"
					>
						{@html infoText}
					</div>
				</div>
			{/if}
		</div>
	{:else if variant === 'inline'}
		<span class="info-helper text-sm text-gray-600">{@html infoText}</span>
	{/if}
{/if}
