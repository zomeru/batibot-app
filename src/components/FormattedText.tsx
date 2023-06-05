import { Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { copyCode, splitByLinksAndCode, textChecker } from '@src/utils/other';
import { ExternalLink } from './ExternalLink';

const FormattedText = ({ text }: { text: string }) => (
  <Text className="">
    {splitByLinksAndCode(text.trim()).map((split, i) => {
      const textType = textChecker(split);

      if (textType === 'link') {
        return (
          <ExternalLink
            showIcon
            key={split + i}
            text={split}
            href={split.startsWith('http') ? split : `https://${split}`}
          />
        );
      }

      if (textType === 'small_code') {
        return (
          <Text
            key={split + i}
            className="font-roboto flex-shrink-1 rounded-sm text-[#b65454] bg-[#08090a5d] italic ">
            {split.replace(/`/g, '')}
          </Text>
        );
      }

      if (textType === 'big_code') {
        const newSplit = split.endsWith('') ? split.slice(0, split.length - 1) : split;
        const finalText = newSplit.slice(3, newSplit.length - 3);

        return (
          <View key={split + i} className="bg-[#2d2727]">
            <Text className="text-xs text-primaryAccent" onPress={() => copyCode(finalText)}>
              Copy Code <AntDesign name="copy1" size={12} />
            </Text>
            <Text className="font-roboto flex-shrink-1 rounded-sm text-[#b65454] italic ">
              {finalText}
            </Text>
          </View>
        );
      }

      return (
        <Text key={split + i} className="font-roboto flex-shrink-1 text-promptText">
          {split}
        </Text>
      );
    })}
  </Text>
);

export default FormattedText;
