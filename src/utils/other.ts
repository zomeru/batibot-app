import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

export const validateEmail = (email: string) => {
  return !!email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const splitByLinksAndCode = (string: string) => {
  const regex =
    /((?:https?:\/\/)?(?:www\.)?(?:[\w-]+\.)*[\w-]+(?:\.[a-zA-Z]{2,63})+(?:\/\S*)?|```[\s\S]*?```|`[\s\S]*?`)/g;

  const splits = string.split(regex);

  if (splits[splits.length - 1] === '') {
    return splits.slice(0, splits.length - 1);
  } else {
    return splits;
  }
};

type TextType = 'link' | 'small_code' | 'big_code' | 'text';

export const textChecker = (str: string): TextType => {
  const bigCode = str.startsWith('```') && str.endsWith('```');
  const smallCode = str.startsWith('`') && str.endsWith('`');

  if (bigCode) return 'big_code';
  if (smallCode && !bigCode) return 'small_code';

  const regex = /((?:https?:\/\/)?(?:www\.)?(?:[\w-]+\.)*[\w-]+(?:\.[a-zA-Z]{2,63})+(?:\/\S*)?)/g;

  if (str.match(regex)) return 'link';
  else return 'text';
};

export const openInAppBrowser = async (url: string, forceCloseOnRedirection: boolean = true) => {
  try {
    const isAvailable = await InAppBrowser.isAvailable();

    if (isAvailable) {
      InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#1a1e24',
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: '#1a1e24',
        secondaryToolbarColor: '#1a1e24',
        navigationBarColor: '#1a1e24',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection,
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
      });
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    Linking.openURL(url);
  }
};

export const copyCode = (text: string) => {
  Clipboard.setString(text);
  Toast.show({
    type: 'success',
    text1: 'Copied to clipboard',
  });
};
