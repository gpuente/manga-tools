import { useTheme } from '@utils/hooks/theme';
import { useTranslation } from 'react-i18next';
import { useModal, ModalKey } from '@utils/hooks';
import { SettingsModal, SettingsModalProps } from '@ui/SettingsModal';

import pkg from '../../../../package.json';

export const SettingsModalImpl = () => {
  const { t, i18n } = useTranslation();
  const { closeModal, open } = useModal(ModalKey.Settings);
  const { theme, setTheme } = useTheme();

  const handleLangChange: SettingsModalProps['handleLangChange'] = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const currentLangCode = i18n.language.toLocaleLowerCase();
  const lng = currentLangCode === 'en-us' ? 'en' : currentLangCode;

  const availableLanguages: SettingsModalProps['availableLanguages'] =
    Object.keys(i18n.options.resources || {}).map((key) => ({
      id: key,
      label: (i18n.options.resources || {})[key].name as string,
      value: key,
      isSelected: key === lng,
    }));

  const handleThemeChange: SettingsModalProps['handleThemeChange'] = (
    _,
    value
  ) => {
    if (value) {
      setTheme(value);
    }
  };

  return (
    <SettingsModal
      handleClose={closeModal}
      open={open}
      version={pkg.version}
      handleLangChange={handleLangChange}
      availableLanguages={availableLanguages}
      handleThemeChange={handleThemeChange}
      selectedTheme={theme}
      texts={{
        title: t('settings.title'),
        theme: {
          label: t('settings.theme'),
          description: t('settings.themeDescription'),
          toggle: {
            dark: t('common.dark'),
            light: t('common.light'),
            system: t('common.system'),
          },
        },
        language: {
          label: t('settings.language'),
          description: t('settings.languageDescription'),
        },
        version: {
          label: t('settings.version'),
          description: t('settings.versionDescription'),
        },
      }}
    />
  );
};
