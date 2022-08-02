import { useIntl } from 'react-intl';

const useI18n = () => {
  const intl = useIntl();
  const t = (key: string, args = {}) => intl.formatMessage({ id: key }, args);
  return t;
};

export default useI18n;
