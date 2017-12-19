// @flow
import {NativeModules} from 'react-native'

const m = __STORYBOOK__
  ? {setSecureFlagSetting: () => {}, getSecureFlagSetting: () => {}}
  : NativeModules.ScreenProtector

const setSecureFlagSetting = m.setSecureFlagSetting
const getSecureFlagSetting = m.getSecureFlagSetting

export {setSecureFlagSetting, getSecureFlagSetting}
