/**
 * Safety / risk-level label translations
 *
 * Shared "coloring-for-safety" vocabulary used by SafetyBadge so any consumer
 * gets a localized risk label (Trusted / Caution / Risk / Danger / Unknown)
 * without wiring up its own overrides. Registered into the shared i18n engine
 * on import; consumer-registered keys still win via deepMerge if they choose to
 * override them.
 *
 * @type {Record<string, Record<string, Record<string, string>>>}
 */
export const safetyTranslations = {
	safety: {
		trusted: {
			en: 'Trusted',
			es: 'Confiable',
			fr: 'Fiable',
			he: 'אמין',
			ru: 'Надёжный',
			yi: 'פֿאַרטרויט'
		},
		caution: {
			en: 'Caution',
			es: 'Precaución',
			fr: 'Prudence',
			he: 'זהירות',
			ru: 'Осторожно',
			yi: 'אָפּהיטונג'
		},
		risk: {
			en: 'Risk',
			es: 'Riesgo',
			fr: 'Risque',
			he: 'סיכון',
			ru: 'Риск',
			yi: 'ריזיקאָ'
		},
		danger: {
			en: 'Danger',
			es: 'Peligro',
			fr: 'Danger',
			he: 'סכנה',
			ru: 'Опасность',
			yi: 'סכּנה'
		},
		unknown: {
			en: 'Unknown',
			es: 'Desconocido',
			fr: 'Inconnu',
			he: 'לא ידוע',
			ru: 'Неизвестно',
			yi: 'אומבאַקאַנט'
		}
	}
};

/**
 * Map a category color key to its safety i18n key.
 * @type {Record<string, string>}
 */
export const colorKeyToSafetyKey = {
	green: 'trusted',
	yellow: 'caution',
	orange: 'risk',
	red: 'danger',
	gray: 'unknown'
};
