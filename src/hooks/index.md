## Hooks

### useI18n

```tsx | pure
import { useI18n } from '9tq-wand';

export default () => {
  const t = useI18n();

  return <p>{t('localeKey')}</p>;
};
```
