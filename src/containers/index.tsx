import { NavigationContainer } from '@react-navigation/native';
import ContextContainer from './Context';
import RootNavigation, { navigationRef } from './Navigation';

export default function RootContainer() {
  return (
    <NavigationContainer ref={navigationRef}>
      <ContextContainer>
        <RootNavigation />
      </ContextContainer>
    </NavigationContainer>
  );
}
