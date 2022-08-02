import React from 'react';
import trim from 'lodash/trim';

const nl2br = (str = '') => {
  if (typeof str !== 'string') return str;
  const splittedString = str.split('\n').filter((e) => trim(e).length > 0);
  return splittedString.map((s, i) => (
    <React.Fragment key={`line${i}`}>
      {s}
      {i < splittedString.length - 1 && <br />}
    </React.Fragment>
  ));
};

export default nl2br;
