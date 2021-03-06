/**
 * Copyright (c) 2014 brian@bevey.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

(function (exports){
  'use strict';

  exports.raspberryRemote = function (deviceId, markup, state, value, fragments) {
    var templateSwitch = fragments.switch,
        i              = 0,
        tempMarkup     = '',
        subDevices,
        getDeviceMarkup = function (device) {
          var deviceTemplate = templateSwitch,
              deviceMarkup   = '';

          deviceMarkup = deviceTemplate.split('{{SUB_DEVICE_ID}}').join(device.label.split(' ').join('+'));
          deviceMarkup = deviceMarkup.split('{{SUB_DEVICE_NAME}}').join(device.label);

          return deviceMarkup;
        };

    if ((value) && (typeof value === 'object')) {
      subDevices = value.devices;

      if (subDevices) {
        for (i in subDevices) {
          if (subDevices.hasOwnProperty(i)) {
            tempMarkup = tempMarkup + getDeviceMarkup(subDevices[i]);
            tempMarkup = tempMarkup.split('{{SUB_DEVICE_CLASS}}').join(subDevices[i].className || 'fa-lightbulb-o');
          }
        }
      }
    }

    return markup.replace('{{RASPBERRY_REMOTE_DYNAMIC}}', tempMarkup);
  };
})(typeof exports === 'undefined' ? this.SB.spec.parsers : exports);
