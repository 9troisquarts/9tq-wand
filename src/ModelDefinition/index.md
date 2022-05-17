## ModelDefinition

### Usage

```tsx | pure
import { ModelDefinition } from '9tq-wand';

const UserDefinition = new ModelDefinition({
  username: 'String',
  birthdate: 'Date',
  email: 'String',
  password: 'Password',
  passwordConfirmation: 'Password',
});

const user = {
  username: '9tq',
  fake: 'fake',
  birthdate: '2021-11-11',
};

const params = UserDefinition.parse(user);
// OUTPUT : { username: '9tq', birthdate: '2021-11-11' }
```
