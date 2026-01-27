/**
 * labels.js - Unified label service for converting API labels to human-readable text
 *
 * This module provides:
 * - Static label mappings (API key -> human-readable label)
 * - Getter functions that fallback to formatting the key if not in mapping
 * - Helper functions for common label transformations
 */

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Convert a snake_case or camelCase key to Title Case with spaces
 * e.g., "some_api_key" -> "Some Api Key"
 * @param {string} key - The key to format
 * @returns {string} - Formatted label
 */
export function formatKeyAsLabel(key) {
	return key
		.replace(/_/g, ' ')
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Strip common prefixes from a key before formatting
 * @param {string} key - The key to process
 * @param {string[]} prefixes - Array of prefix patterns to strip (regex strings)
 * @returns {string} - Key with prefixes removed
 */
export function stripPrefixes(key, prefixes = []) {
	let result = key;
	for (const prefix of prefixes) {
		result = result.replace(new RegExp(prefix), '');
	}
	return result;
}

// =============================================================================
// APPLE RESTRICTIONS LABELS
// =============================================================================

const restrictionLabels = {
	// Device restrictions
	ios_restrictions_apps_allow_app_clips: 'Allow App Clips',
	ios_restrictions_apps_allow_app_removal: 'Allow App Removal',
	ios_restrictions_apps_allow_in_app_purchases: 'Allow In-App Purchases',
	ios_restrictions_general_allow_connect_to_pc: 'Allow Connect to PC',
	ios_restrictions_general_allow_enabling_restrictions: 'Allow Modify Restrictions',
	ios_restrictions_general_allow_find_my_device: 'Allow Find My Device',
	ios_restrictions_general_allow_personal_hotspot_modification: 'Allow Personal Hotspot Settings',
	// Services restrictions
	ios_restrictions_apps_allow_imessage: 'Allow iMessage',
	ios_restrictions_apps_allow_multiplayer_gaming: 'Allow Multiplayer Gaming',
	ios_restrictions_apps_allow_music: 'Allow Apple Music',
	ios_restrictions_apps_allow_news: 'Allow Apple News',
	ios_restrictions_apps_allow_podcasts: 'Allow Podcasts',
	ios_restrictions_apps_allow_radio: 'Allow Radio',
	ios_restrictions_general_allow_definition_lookup: 'Allow Definition Lookup',
	ios_restrictions_general_allow_video_conferencing: 'Allow Video Conferencing',
	ios_restrictions_media_allow_explicit_content: 'Allow Explicit Content',
	ios_restrictions_siri_allow_spotlight_internet_results: 'Allow Spotlight Internet Results',
	// Siri restrictions
	ios_restrictions_siri_allow_assistant: 'Allow Siri',
	ios_restrictions_siri_allow_assistant_user_generated_content: 'Allow Siri User-Generated Content',
	ios_restrictions_siri_force_assistant_profanity_filter: 'Force Siri Profanity Filter'
};

/**
 * Get human-readable label for an Apple Restriction key
 * @param {string} key - The restriction key from API
 * @returns {string} - Human-readable label
 */
export function getRestrictionLabel(key) {
	if (restrictionLabels[key]) {
		return restrictionLabels[key];
	}
	// Fallback: strip prefix and format
	const stripped = stripPrefixes(key, [
		'^ios_restrictions_(apps|general|media|siri)_',
		'^allow_',
		'^force_'
	]);
	return formatKeyAsLabel(stripped);
}

// =============================================================================
// TEXT FILTERING LABELS
// =============================================================================

const textFilteringCategoryLabels = {
	Celebrities: 'Celebrities',
	Gambling: 'Gambling',
	Dating: 'Dating',
	Swimsuite: 'Swimwear', // Note: API has typo "Swimsuite"
	Adult: 'Adult Content',
	AdultsVeryStrict: 'Suggestive Content'
};

/**
 * Get human-readable label for a text filtering category
 * @param {string} category - The category from API
 * @returns {string} - Human-readable label
 */
export function getTextFilteringLabel(category) {
	return textFilteringCategoryLabels[category] || category;
}

// =============================================================================
// YOUTUBE CATEGORY LABELS
// =============================================================================

const youtubeRequestCategoryLabels = {
	'YT_Autos & Vehicles': 'Autos & Vehicles',
	YT_Education: 'Education',
	YT_Entertainment: 'Entertainment',
	YT_Gamming: 'Gaming', // Note: API has typo "Gamming"
	'YT_How To': 'How-To',
	YT_Music: 'Music',
	'YT_News & Politics': 'News & Politics',
	YT_Nonprofits: 'Nonprofits',
	'YT_People & Blogs': 'People & Blogs',
	YT_Shorts: 'YouTube Shorts',
	YT_Sports: 'Sports',
	YT_Travel: 'Travel'
};

/**
 * Get human-readable label for a YouTube category
 * @param {string} categoryId - The category ID from API (e.g., "YT_Music")
 * @returns {string} - Human-readable label
 */
export function getYoutubeRequestLabel(categoryId) {
	if (youtubeRequestCategoryLabels[categoryId]) {
		return youtubeRequestCategoryLabels[categoryId];
	}
	// Fallback: strip YT_ prefix and format
	return categoryId.replace('YT_', '').replace(/_/g, ' ');
}

/**
 * Check if a category ID is a YouTube category
 * @param {string} categoryId - The category ID to check
 * @returns {boolean} - True if it's a YouTube category
 */
export function isYoutubeCategory(categoryId) {
	return categoryId?.startsWith('YT_') || false;
}

// =============================================================================
// YOUTUBE COLOR MAPPING
// =============================================================================

const youtubeColorMapping = {
	YT_Education: 'green',
	'YT_Autos & Vehicles': 'green',
	'YT_How To': 'green',
	YT_Nonprofits: 'yellow',
	YT_Travel: 'yellow',
	YT_Sports: 'orange',
	YT_Gamming: 'orange',
	'YT_News & Politics': 'orange',
	'YT_People & Blogs': 'red',
	YT_Entertainment: 'red',
	YT_Music: 'red',
	YT_Shorts: 'red'
};

/**
 * Get color key for a YouTube category (for SafetyBadge)
 * @param {string} categoryId - The YouTube category ID
 * @returns {string} - Color key (green, yellow, orange, red, gray)
 */
export function getYoutubeColorKey(categoryId) {
	return youtubeColorMapping[categoryId] || 'gray';
}

// =============================================================================
// FEATURE GROUP LABELS
// =============================================================================

const featureGroupLabels = {
	filter_access: 'Filter Access',
	filter_features: 'Filter Features',
	'in-app-browser': 'In-App Browsers',
	ios_portal: 'iOS Portal',
	general: 'General',
	extension: 'Extension',
	image_removal: 'Image Removal',
	fix: 'Fixes & Patches',
	addon_site_lists: 'Site Allowlists',
	youtubepro: 'YouTube Pro',
	youtube: 'YouTube',
	whatsapp: 'WhatsApp'
};

/**
 * Get human-readable label for a feature group
 * @param {string} featureName - The feature group name from API
 * @returns {string} - Human-readable label
 */
export function getFeatureGroupLabel(featureName) {
	return featureGroupLabels[featureName] || formatKeyAsLabel(featureName);
}

// =============================================================================
// SETTINGS GROUP LABELS
// =============================================================================

const settingsGroupLabels = {
	account_security: 'Account Security',
	extension: 'Extension',
	main: 'Main',
	network: 'Network',
	other: 'Other',
	system_permissions: 'System Permissions',
	system_settings: 'System Settings'
};

/**
 * Get human-readable label for a settings group
 * @param {string} groupName - The settings group name from API
 * @returns {string} - Human-readable label
 */
export function getSettingsGroupLabel(groupName) {
	return settingsGroupLabels[groupName] || formatKeyAsLabel(groupName);
}

// =============================================================================
// SETTING KEY LABELS
// =============================================================================

const settingKeyLabels = {
	// Account Security
	apple_settings_asscociation_enabled: 'Apple Settings Association',
	apple_system_allow_requests_to_support: 'Allow Requests to Support',
	global_settings_allow_airplane_mode_wifi_button: 'Allow Airplane Mode/WiFi Button',
	global_system_allow_app_request: 'Allow App Requests',
	global_system_allow_chat_support: 'Allow Chat Support',
	global_system_allow_site_request: 'Allow Site Requests',
	global_system_portal_as_parental_control: 'Portal as Parental Control',
	ios_settings_allow_all_not_reviewd_sites: 'Allow All Non-Reviewed Sites',
	ios_settings_allow_not_reviewd_apps: 'Allow Non-Reviewed Apps',
	ios_settings_app_whitelist: 'App Whitelist Mode',
	ios_settings_deny_all_not_reviewd_apps: 'Deny All Non-Reviewed Apps',
	ios_settings_deny_all_not_reviewd_sites: 'Deny All Non-Reviewed Sites',
	ios_settings_open_mb_portal_fullscreen: 'Open MB Portal Fullscreen',
	mac_allow_app_installation_outside_app_store: 'Allow Mac App Installation Outside App Store',
	// Extension
	apple_settings_block_extension_videos: 'Block Extension Videos',
	ios_settings_18_password_not_removed: 'iOS 18 Password Not Removed',
	ios_settings_18_password_removed: 'iOS 18 Password Removed',
	// Main
	global_system_filter_on: 'Filter Enabled',
	// Network
	apple_settings_captive_pass: 'Captive Portal Pass',
	apple_settings_use_dns: 'Use DNS',
	ios_settings_advanced_site_blocking: 'Advanced Site Blocking',
	ios_settings_install_dns_from_mdm: 'Install DNS from MDM',
	ios_settings_no_content_filter: 'No Content Filter',
	ios_settings_use_mb_content_filter: 'Use MB Content Filter',
	// Other
	apple_settings_only_dns: 'DNS Only Mode',
	apple_system_bypass_installer_check_removal: 'Bypass Installer Check Removal',
	apple_system_is_free: 'Free Account',
	apple_system_is_test: 'Test Account',
	apple_system_pro_is_free: 'Pro is Free',
	ios_settings_remove_ios_web_restrictions: 'Remove iOS Web Restrictions',
	// System Permissions
	global_system_portal_changes_only_with_pin: 'Portal Changes Only with PIN',
	// System Settings
	global_system_low_support_mode: 'Low Support Mode'
};

/**
 * Get human-readable label for a setting key
 * @param {string} settingKey - The setting key from API
 * @returns {string} - Human-readable label
 */
export function getSettingKeyLabel(settingKey) {
	return settingKeyLabels[settingKey] || formatKeyAsLabel(settingKey);
}

// =============================================================================
// EXTENSION EXTRAS LABELS
// =============================================================================

/**
 * Get human-readable label for extension extras key
 * Simple transformation: snake_case -> Title Case
 * @param {string} key - The extras key
 * @returns {string} - Human-readable label
 */
export function getExtrasLabel(key) {
	return formatKeyAsLabel(key);
}

// =============================================================================
// EXPORT ALL LABEL MAPS (for advanced use cases)
// =============================================================================

export const labelMaps = {
	restrictions: restrictionLabels,
	textFiltering: textFilteringCategoryLabels,
	youtube: youtubeRequestCategoryLabels,
	youtubeColors: youtubeColorMapping,
	featureGroups: featureGroupLabels,
	settingsGroups: settingsGroupLabels,
	settingKeys: settingKeyLabels
};
