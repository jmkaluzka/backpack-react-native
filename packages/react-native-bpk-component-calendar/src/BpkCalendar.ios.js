/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React from 'react';
import { requireNativeComponent } from 'react-native';

import {
  commonPropTypes,
  commonDefaultProps,
  type CommonProps,
} from './common-types';

const RCTBPKCalendar = requireNativeComponent('RCTBPKCalendar');

export type Props = {
  ...$Exact<CommonProps>,
};

const BpkCalendar = (props: Props) => {
  const {
    minDate,
    maxDate,
    onChangeSelectedDates,
    selectedDates,
    ...rest
  } = props;

  if (minDate && maxDate) {
    if (minDate > maxDate) {
      // It's safer to throw an error rather than use a prop type because if
      // we let this get rendered it will crash the calendar.
      throw new Error(`BpkCalendar: "minDate" must be before "maxDate".`);
    }
  }

  return (
    <RCTBPKCalendar
      minDate={minDate}
      maxDate={maxDate}
      onDateSelection={event => {
        if (event.nativeEvent.selectedDates) {
          const convertedDates = event.nativeEvent.selectedDates.map(
            dateString => new Date(Date.parse(dateString)),
          );
          if (onChangeSelectedDates) {
            onChangeSelectedDates(convertedDates);
          }
        }
      }}
      selectedDates={selectedDates}
      {...rest}
    />
  );
};

BpkCalendar.propTypes = commonPropTypes;
BpkCalendar.defaultProps = commonDefaultProps;

export default BpkCalendar;
