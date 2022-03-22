import React, { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { II18n } from '@core/models';
import { I18nService } from '@core/services';
// import styles from './AccessDenied.module.scss';

interface AccessDeniedProps {
  redirectToHome?: boolean;
}

const AccessDenied: FunctionComponent<AccessDeniedProps> = (
  props: AccessDeniedProps,
) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.redirectToHome) {
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    }
  }, [navigate, props.redirectToHome]);

  return (
    <div
    // className={styles['main-document']}
    >
      <h4>{translate('accessDenied')}</h4>
      <img
        src='public/assets/images/access_denied.png'
        title={translate('accessDenied')}
        alt={translate('accessDenied')}
        className={'styles.img'}
      />
    </div>
  );
};

AccessDenied.defaultProps = {
  redirectToHome: true,
};

const translations: II18n = {
  es: {
    accessDenied: 'Se le ha denegado el acceso',
  },
  enUS: {
    accessDenied: 'Your access has been denied',
  },
  ptBR: {
    accessDenied: 'Seu acesso foi negado',
  },
};

const translate = (key: string, args?: string[]): string =>
  new I18nService(translations).translate(key, args);

export { AccessDenied };
