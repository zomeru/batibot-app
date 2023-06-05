import { Text, View } from 'react-native';
import TypeWriter from 'react-native-typewriter';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useState } from 'react';

import { copyCode, splitByLinksAndCode, textChecker } from '@src/utils/other';

const FormattedGPTResponse = ({ text }: { text: string }) => {
  const [currentIndexesTyped, setCurrentIndexesTyped] = useState([0]);

  const onTypingEnd = (i: number) => {
    if (!currentIndexesTyped.includes(i + 1)) {
      setCurrentIndexesTyped([...currentIndexesTyped, i + 1]);
    }
  };

  // console.log({
  //   text: splitByLinksAndCode(text.trim()),
  // });

  return (
    <Text>
      {splitByLinksAndCode(text.trim()).map((split, i) => {
        const textType = textChecker(split);

        if (textType === 'link') {
          if (currentIndexesTyped.includes(i)) {
            return (
              <TypeWriter
                key={split + i}
                onTypingEnd={() => onTypingEnd(i)}
                typing={1}
                initialDelay={0}
                maxDelay={20}
                minDelay={0}
                className="font-roboto flex-shrink-1 rounded-sm text-[#3eb7d1]">
                {split}
              </TypeWriter>
            );
          }
        } else if (textType === 'small_code') {
          if (currentIndexesTyped.includes(i)) {
            return (
              <TypeWriter
                key={split + i}
                onTypingEnd={() => onTypingEnd(i)}
                typing={1}
                initialDelay={0}
                maxDelay={20}
                minDelay={0}
                className="font-roboto flex-shrink-1 rounded-sm text-[#b65454] bg-[#08090a5d] italic ">
                {split.replace(/`/g, '')}
              </TypeWriter>
            );
          }
        } else if (textType === 'big_code') {
          const newSplit = split.endsWith('') ? split.slice(0, text.length - 1) : text;
          const finalText = newSplit.slice(3, newSplit.length - 3);

          if (currentIndexesTyped.includes(i)) {
            return (
              <View key={split + i} className="bg-[#2d2727]">
                <Text className="text-xs text-primaryAccent" onPress={() => copyCode(finalText)}>
                  Copy Code <AntDesign name="copy1" size={12} />
                </Text>
                <TypeWriter
                  onTypingEnd={() => onTypingEnd(i)}
                  typing={1}
                  initialDelay={0}
                  maxDelay={20}
                  minDelay={0}
                  className="font-roboto flex-shrink-1 rounded-sm text-[#b65454] italic ">
                  {finalText}
                </TypeWriter>
              </View>
            );
          }
        } else {
          if (currentIndexesTyped.includes(i)) {
            return (
              <TypeWriter
                key={split + i}
                onTypingEnd={() => onTypingEnd(i)}
                typing={1}
                initialDelay={0}
                maxDelay={20}
                minDelay={0}
                className="font-roboto flex-shrink-1 text-promptText">
                {split}
              </TypeWriter>
            );
          }
        }
      })}
    </Text>
  );
};

export default FormattedGPTResponse;
