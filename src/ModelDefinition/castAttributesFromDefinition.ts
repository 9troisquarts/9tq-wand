// @ts-nocheck
import forIn from 'lodash/forIn';
import isObject from 'lodash/isObject';
import omit from 'lodash/omit';
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';

import { DateTime } from "luxon";

const toFloat = (v: number) => parseFloat(v.toString().replace(/\,/g, '.'));

export type AttributesType = {
  [k: string]: any;
};

function castAttributesFromModel(
  model: any,
  attributes: any,
  options: any,
) {
  const formattedModel: any = {};
  forIn(model, (value, key) => {
    if (isObject(value)) {
      if(value.type === "Places") {
        formattedModel[value.options?.formattedAddress || key] = attributes[key]?.formattedAddress;
        formattedModel[value.options?.city || 'city'] = attributes[key]?.city;
        formattedModel[value.options?.lat || 'lat'] = attributes[key]?.lat;
        formattedModel[value.options?.lng || 'lng'] = attributes[key]?.lng;
      } else {
        if (!isNil(attributes[key])) {
          const attributeValue = attributes[key];
          if (attributeValue)
            formattedModel[`${key}Attributes`] = isArray(attributeValue)
              ? attributeValue.map((v) => castAttributesFromModel(value, v))
              : castAttributesFromModel(value, attributeValue);
        }
      }
    } else if (!isNil(attributes[key])) {
      switch (value) {
        case 'float':
          formattedModel[key] = toFloat(attributes[key]);
          break;
        case 'integer':
          formattedModel[key] = parseInt(attributes[key], 10);
          break;
        case 'string':
          formattedModel[key] =
            typeof attributes[key] === 'string'
              ? attributes[key]
              : attributes[key].toString();
          break;
        case 'date':
          formattedModel[key] = DateTime.isDateTime(attributes[key]) ?
              attributes[key].toISODate()
              : attributes[key];
          break;
        case 'datetime':
          formattedModel[key] = DateTime.isDateTime(attributes[key]) ?
            attributes[key].toISO()
            : attributes[key];
          break;
        case 'password':
        case 'files':
        case 'file':
          if (attributes[key]) formattedModel[key] = attributes[key];
          break;
        case 'nested':
          if (attributes[key])
            formattedModel[`${key}Attributes`] = isArray(attributes[key])
              ? attributes[key].map((v) => omit(v, ['__typename']))
              : omit(attributes[key], ['__typename']);
          break;
        default:
          formattedModel[key] = attributes[key];
          break;
      }
    } else if (value !== 'password' && value !== 'nested') {
      if (!options.skipUndefinedKeys || attributes.hasOwnProperty(key))
        formattedModel[key] = null;
    }
  });
  return formattedModel;
};

export default castAttributesFromModel;
