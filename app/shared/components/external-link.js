import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Text} from 'react-native';

export default function ExternalLink({display, url}) {
  const [supportsLinking, setSupportsLinking] = useState(false);
  useEffect(() => {
    Linking.canOpenURL(url)
      .then((e) => setSupportsLinking(e))
      .catch(() => setSupportsLinking(false));
  }, [url]);

  const openLink = useCallback(() => {
    if (supportsLinking) {
      Linking.openURL(url);
    }
  }, [url, supportsLinking]);

  return (
    <Text
      onPress={openLink}
      style={supportsLinking ? {color: '#0000EE'} : undefined}>
      {display || url}
    </Text>
  );
}
