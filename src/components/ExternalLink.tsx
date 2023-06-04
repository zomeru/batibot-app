import { Linking, StyleProp, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export function ExternalLink({
  href,
  text,
  className,
  style,
}: {
  href: string;
  text: string;
  className?: string;
  style?: StyleProp<any>;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(href);
      }}
    >
      <Text style={style} className={className}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
