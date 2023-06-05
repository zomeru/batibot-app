import { Text } from 'react-native';

import { splitByLinksAndCode, textChecker } from '@src/utils/other';
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

      if (textType === 'small_code' || textType === 'big_code') {
        return (
          <Text
            key={split + i}
            className="font-roboto flex-shrink-1 rounded-sm text-[#b65454] bg-[#08090a5d] italic ">
            {split.replace(/`/g, '')}
          </Text>
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
