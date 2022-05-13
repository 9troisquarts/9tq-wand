import '@testing-library/jest-dom';
import { DateTime } from "luxon";
import ModelDefinition from './index';

describe('ModelDefinition', () => {
  it('cast string to float', () => {
    const definition = new ModelDefinition({
      price: 'float'
    });
    const parsedAttributes = definition.parse({ price: '45,87' });
    expect(parsedAttributes.price).toEqual(45.87);
  });

  it('cast date to string', () => {
    const date = DateTime.local(2022, 5, 13, 8, 30);
    const definition = new ModelDefinition({
      date: 'date',
      datetime: 'datetime'
    });
    const parsedAttributes = definition.parse({ date, datetime: date });
    expect(parsedAttributes.date).toEqual('2022-05-13');
    expect(parsedAttributes.datetime).toEqual('2022-05-13T08:30:00.000+02:00');
  })
});
