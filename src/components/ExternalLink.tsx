import { StyleProp, Text } from 'react-native';
import React from 'react';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import { openInAppBrowser } from '@src/utils/other';

export function ExternalLink({
  href,
  text,
  className,
  style,
  showIcon = false,
  children,
}: {
  href: string;
  text?: string;
  className?: string;
  style?: StyleProp<any>;
  showIcon?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Text
      onPress={async () => {
        await openInAppBrowser(href);
      }}
      style={style}
      className={`font-roboto text-primaryAccent ${className}`}>
      {text}
      {children}
      {showIcon && <EvilIcon name="external-link" size={16} color="#3eb7d1" />}
    </Text>
  );
}
